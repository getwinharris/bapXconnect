<?php

namespace bapXdb\Platform\Modules\Console;

use bapXdb\Platform\Modules\Console\Services\Http;
use Utopia\Platform;

class Module extends Platform\Module
{
    public function __construct()
    {
        $this->addService('http', new Http());
    }
}
