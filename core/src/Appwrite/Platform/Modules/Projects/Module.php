<?php

namespace bapXdb\Platform\Modules\Projects;

use bapXdb\Platform\Modules\Projects\Services\Http;
use Utopia\Platform\Module as Base;

class Module extends Base
{
    public function __construct()
    {
        $this->addService('http', new Http());
    }
}
