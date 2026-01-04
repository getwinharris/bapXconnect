<?php

namespace bapXdb\Platform\Modules;

use bapXdb\Platform\Services\Tasks;
use bapXdb\Platform\Services\Workers;
use Utopia\Platform\Module;

class Core extends Module
{
    public function __construct()
    {
        $this->addService('tasks', new Tasks());
        $this->addService('workers', new Workers());
    }

}
