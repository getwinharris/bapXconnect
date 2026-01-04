<?php

namespace bapXdb\Platform\Services;

use bapXdb\Platform\Workers\Audits;
use bapXdb\Platform\Workers\Certificates;
use bapXdb\Platform\Workers\Deletes;
use bapXdb\Platform\Workers\Functions;
use bapXdb\Platform\Workers\Mails;
use bapXdb\Platform\Workers\Messaging;
use bapXdb\Platform\Workers\Migrations;
use bapXdb\Platform\Workers\StatsResources;
use bapXdb\Platform\Workers\StatsUsage;
use bapXdb\Platform\Workers\Webhooks;
use Utopia\Platform\Service;

class Workers extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_WORKER;
        $this
            ->addAction(Audits::getName(), new Audits())
            ->addAction(Certificates::getName(), new Certificates())
            ->addAction(Deletes::getName(), new Deletes())
            ->addAction(Functions::getName(), new Functions())
            ->addAction(Mails::getName(), new Mails())
            ->addAction(Messaging::getName(), new Messaging())
            ->addAction(Webhooks::getName(), new Webhooks())
            ->addAction(StatsUsage::getName(), new StatsUsage())
            ->addAction(Migrations::getName(), new Migrations())
            ->addAction(StatsResources::getName(), new StatsResources())
        ;
    }
}
