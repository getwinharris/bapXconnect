<?php

namespace bapXdb\Platform\Modules\Functions;

use bapXdb\Platform\Modules\Functions\Services\Http;
use bapXdb\Platform\Modules\Functions\Services\Workers;
use Utopia\Platform;

class Module extends Platform\Module
{
    public function __construct()
    {
        $this->addService('http', new Http());
        $this->addService('workers', new Workers());
    }
}
