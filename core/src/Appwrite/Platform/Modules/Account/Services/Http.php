<?php

namespace bapXdb\Platform\Modules\Account\Services;

use bapXdb\Platform\Modules\Account\Http\Account\MFA\Authenticators\Create as CreateAuthenticator;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\Authenticators\Delete as DeleteAuthenticator;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\Authenticators\Update as UpdateAuthenticator;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\Challenges\Create as CreateChallenge;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\Challenges\Update as UpdateChallenge;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\Factors\XList as ListFactors;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\RecoveryCodes\Create as CreateRecoveryCodes;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\RecoveryCodes\Get as GetRecoveryCodes;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\RecoveryCodes\Update as UpdateRecoveryCodes;
use bapXdb\Platform\Modules\Account\Http\Account\MFA\Update as UpdateMfa;
use Utopia\Platform\Service;

class Http extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_HTTP;
        $this
            ->addAction(UpdateMfa::getName(), new UpdateMfa())
            ->addAction(ListFactors::getName(), new ListFactors())
            ->addAction(CreateAuthenticator::getName(), new CreateAuthenticator())
            ->addAction(UpdateAuthenticator::getName(), new UpdateAuthenticator())
            ->addAction(DeleteAuthenticator::getName(), new DeleteAuthenticator())
            ->addAction(CreateRecoveryCodes::getName(), new CreateRecoveryCodes())
            ->addAction(UpdateRecoveryCodes::getName(), new UpdateRecoveryCodes())
            ->addAction(GetRecoveryCodes::getName(), new GetRecoveryCodes())
            ->addAction(CreateChallenge::getName(), new CreateChallenge())
            ->addAction(UpdateChallenge::getName(), new UpdateChallenge());
    }
}
