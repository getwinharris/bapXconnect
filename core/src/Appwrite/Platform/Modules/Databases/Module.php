<?php

namespace bapXdb\Platform\Modules\Databases;

require_once __DIR__ . '/Constants.php';

use bapXdb\Platform\Modules\Databases\Services\Http;
use bapXdb\Platform\Modules\Databases\Services\Workers;
use Utopia\Platform;

class Module extends Platform\Module
{
    public function __construct()
    {
        $this->addService('http', new Http());
        $this->addService('workers', new Workers());
    }
}
