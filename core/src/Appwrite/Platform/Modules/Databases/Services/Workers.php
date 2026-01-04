<?php

namespace bapXdb\Platform\Modules\Databases\Services;

use bapXdb\Platform\Modules\Databases\Workers\Databases;
use Utopia\Platform\Service;

class Workers extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_WORKER;
        $this->addAction(Databases::getName(), new Databases());
    }
}
