<?php

namespace bapXdb\Platform\Modules\Proxy\Services;

use bapXdb\Platform\Modules\Proxy\Http\Rules\API\Create as CreateAPIRule;
use bapXdb\Platform\Modules\Proxy\Http\Rules\Delete as DeleteRule;
use bapXdb\Platform\Modules\Proxy\Http\Rules\Function\Create as CreateFunctionRule;
use bapXdb\Platform\Modules\Proxy\Http\Rules\Get as GetRule;
use bapXdb\Platform\Modules\Proxy\Http\Rules\Redirect\Create as CreateRedirectRule;
use bapXdb\Platform\Modules\Proxy\Http\Rules\Site\Create as CreateSiteRule;
use bapXdb\Platform\Modules\Proxy\Http\Rules\Verification\Update as UpdateRuleVerification;
use bapXdb\Platform\Modules\Proxy\Http\Rules\XList as ListRules;
use Utopia\Platform\Service;

class Http extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_HTTP;

        // Rules
        $this->addAction(CreateAPIRule::getName(), new CreateAPIRule());
        $this->addAction(CreateSiteRule::getName(), new CreateSiteRule());
        $this->addAction(CreateFunctionRule::getName(), new CreateFunctionRule());
        $this->addAction(CreateRedirectRule::getName(), new CreateRedirectRule());
        $this->addAction(GetRule::getName(), new GetRule());
        $this->addAction(ListRules::getName(), new ListRules());
        $this->addAction(DeleteRule::getName(), new DeleteRule());
        $this->addAction(UpdateRuleVerification::getName(), new UpdateRuleVerification());
    }
}
