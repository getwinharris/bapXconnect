<?php

namespace bapXdb\Platform\Modules\Account\Http\Account\MFA\Factors;

use bapXdb\Auth\MFA\Type;
use bapXdb\Auth\MFA\Type\TOTP;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Deprecated;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Document;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class XList extends Action
{
    use HTTP;

    public static function getName(): string
    {
        return 'listMFAFactors';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/account/mfa/factors')
            ->desc('List factors')
            ->groups(['api', 'account', 'mfa'])
            ->label('scope', 'account')
            ->label('sdk', [
                new Method(
                    namespace: 'account',
                    group: 'mfa',
                    name: 'listMfaFactors',
                    description: '/docs/references/account/list-mfa-factors.md',
                    auth: [AuthType::ADMIN, AuthType::SESSION, AuthType::JWT],
                    responses: [
                        new SDKResponse(
                            code: Response::STATUS_CODE_OK,
                            model: Response::MODEL_MFA_FACTORS,
                        )
                    ],
                    contentType: ContentType::JSON,
                    deprecated: new Deprecated(
                        since: '1.8.0',
                        replaceWith: 'account.listMFAFactors',
                    ),
                    public: false,
                ),
                new Method(
                    namespace: 'account',
                    group: 'mfa',
                    name: 'listMFAFactors',
                    description: '/docs/references/account/list-mfa-factors.md',
                    auth: [AuthType::ADMIN, AuthType::SESSION, AuthType::JWT],
                    responses: [
                        new SDKResponse(
                            code: Response::STATUS_CODE_OK,
                            model: Response::MODEL_MFA_FACTORS,
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
        $recoveryCodeEnabled = \is_array($mfaRecoveryCodes) && \count($mfaRecoveryCodes) > 0;

        $totp = TOTP::getAuthenticatorFromUser($user);

        $factors = new Document([
            Type::TOTP => $totp !== null && $totp->getAttribute('verified', false),
            Type::EMAIL => $user->getAttribute('email', false) && $user->getAttribute('emailVerification', false),
            Type::PHONE => $user->getAttribute('phone', false) && $user->getAttribute('phoneVerification', false),
            Type::RECOVERY_CODE => $recoveryCodeEnabled
        ]);

        $response->dynamic($factors, Response::MODEL_MFA_FACTORS);
    }
}
