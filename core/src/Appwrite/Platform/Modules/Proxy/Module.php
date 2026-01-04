<?php

namespace bapXdb\Platform\Modules\Proxy;

use bapXdb\Platform\Modules\Proxy\Services\Http;
use Utopia\Platform;

class Module extends Platform\Module
{
    public function __construct()
    {
        $this->addService('http', new Http());
    }
}
