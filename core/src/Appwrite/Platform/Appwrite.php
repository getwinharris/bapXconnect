<?php

namespace bapXdb\Platform;

use bapXdb\Platform\Modules\Account;
use bapXdb\Platform\Modules\Console;
use bapXdb\Platform\Modules\Core;
use bapXdb\Platform\Modules\Databases;
use bapXdb\Platform\Modules\Functions;
use bapXdb\Platform\Modules\Projects;
use bapXdb\Platform\Modules\Proxy;
use bapXdb\Platform\Modules\Sites;
use bapXdb\Platform\Modules\Tokens;
use Utopia\Platform\Platform;

class bapXdb extends Platform
{
    public function __construct()
    {
        parent::__construct(new Core());
        $this->addModule(new Account\Module());
        $this->addModule(new Databases\Module());
        $this->addModule(new Projects\Module());
        $this->addModule(new Functions\Module());
        $this->addModule(new Sites\Module());
        $this->addModule(new Console\Module());
        $this->addModule(new Proxy\Module());
        $this->addModule(new Tokens\Module());
    }
}
