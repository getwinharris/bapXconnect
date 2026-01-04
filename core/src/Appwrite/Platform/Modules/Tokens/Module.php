<?php

namespace bapXdb\Platform\Modules\Tokens;

use bapXdb\Platform\Modules\Tokens\Services\Http;
use Utopia\Platform;

class Module extends Platform\Module
{
    public function __construct()
    {
        $this->addService('http', new Http());
    }
}
