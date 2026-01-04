<?php

namespace bapXdb\Platform\Modules\Account;

use bapXdb\Platform\Modules\Account\Services\Http;
use Utopia\Platform;

class Module extends Platform\Module
{
    public function __construct()
    {
        $this->addService('http', new Http());
    }
}
