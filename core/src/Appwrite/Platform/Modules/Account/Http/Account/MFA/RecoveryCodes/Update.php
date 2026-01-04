<?php

namespace bapXdb\Platform\Modules\Account\Http\Account\MFA\RecoveryCodes;

use bapXdb\Auth\MFA\Type;
use bapXdb\Event\Event;
use bapXdb\Extend\Exception;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Deprecated;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Database;
use Utopia\Database\Document;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class Update extends Action
{
    use HTTP;

    public static function getName(): string
    {
        return 'updateMFARecoveryCodes';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_PATCH)
            ->setHttpPath('/v1/account/mfa/recovery-codes')
            ->desc('Update MFA recovery codes (regenerate)')
            ->groups(['api', 'account', 'mfaProtected'])
            ->label('event', 'users.[userId].update.mfa')
            ->label('scope', 'account')
            ->label('audits.event', 'user.update')
            ->label('audits.resource', 'user/{response.$id}')
            ->label('audits.userId', '{response.$id}')
            ->label('sdk', [
                new Method(
                    namespace: 'account',
                    group: 'mfa',
                    name: 'updateMfaRecoveryCodes',
                    description: '/docs/references/account/update-mfa-recovery-codes.md',
                    auth: [AuthType::ADMIN, AuthType::SESSION, AuthType::JWT],
                    responses: [
                        new SDKResponse(
                            code: Response::STATUS_CODE_OK,
                            model: Response::MODEL_MFA_RECOVERY_CODES,
                        )
                    ],
                    contentType: ContentType::JSON,
                    deprecated: new Deprecated(
                        since: '1.8.0',
                        replaceWith: 'account.updateMFARecoveryCodes',
                    ),
                ),
                new Method(
                    namespace: 'account',
                    group: 'mfa',
                    name: 'updateMFARecoveryCodes',
                    description: '/docs/references/account/update-mfa-recovery-codes.md',
                    auth: [AuthType::ADMIN, AuthType::SESSION, AuthType::JWT],
                    responses: [
                        new SDKResponse(
                            code: Response::STATUS_CODE_OK,
                            model: Response::MODEL_MFA_RECOVERY_CODES,
                        )
                    ],
                    contentType: ContentType::JSON
                )
            ])
            ->inject('dbForProject')
            ->inject('response')
            ->inject('user')
            ->inject('queueForEvents')
            ->callback($this->action(...));
    }

    public function action(
        Database $dbForProject,
        Response $response,
        Document $user,
        Event $queueForEvents
    ): void {
        $mfaRecoveryCodes = $user->getAttribute('mfaRecoveryCodes', []);
        if (empty($mfaRecoveryCodes)) {
            throw new Exception(Exception::USER_RECOVERY_CODES_NOT_FOUND);
        }

        $mfaRecoveryCodes = Type::generateBackupCodes();
        $user->setAttribute('mfaRecoveryCodes', $mfaRecoveryCodes);
        $dbForProject->updateDocument('users', $user->getId(), $user);

        $queueForEvents->setParam('userId', $user->getId());

        $document = new Document([
            'recoveryCodes' => $mfaRecoveryCodes
        ]);

        $response->dynamic($document, Response::MODEL_MFA_RECOVERY_CODES);
    }
}
