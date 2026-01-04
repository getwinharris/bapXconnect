<?php

namespace bapXdb\Platform\Modules\Account\Http\Account\MFA\RecoveryCodes;

use bapXdb\Extend\Exception;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Deprecated;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Document;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class Get extends Action
{
    use HTTP;

    public static function getName(): string
    {
        return 'getMFARecoveryCodes';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/account/mfa/recovery-codes')
            ->desc('List MFA recovery codes')
            ->groups(['api', 'account', 'mfaProtected'])
            ->label('scope', 'account')
            ->label('sdk', [
                new Method(
                    namespace: 'account',
                    group: 'mfa',
                    name: 'getMfaRecoveryCodes',
                    description: '/docs/references/account/get-mfa-recovery-codes.md',
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
                        replaceWith: 'account.getMFARecoveryCodes',
                    ),
                    public: false,
                ),
                new Method(
                    namespace: 'account',
                    group: 'mfa',
                    name: 'getMFARecoveryCodes',
                    description: '/docs/references/account/get-mfa-recovery-codes.md',
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
            ->inject('response')
            ->inject('user')
            ->callback($this->action(...));
    }

    public function action(Response $response, Document $user): void
    {
        $mfaRecoveryCodes = $user->getAttribute('mfaRecoveryCodes', []);

        if (empty($mfaRecoveryCodes)) {
            throw new Exception(Exception::USER_RECOVERY_CODES_NOT_FOUND);
        }

        $document = new Document([
            'recoveryCodes' => $mfaRecoveryCodes
        ]);

        $response->dynamic($document, Response::MODEL_MFA_RECOVERY_CODES);
    }
}
