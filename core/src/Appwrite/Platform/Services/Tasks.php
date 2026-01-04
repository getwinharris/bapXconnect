<?php

namespace bapXdb\Platform\Services;

use bapXdb\Platform\Tasks\Doctor;
use bapXdb\Platform\Tasks\Install;
use bapXdb\Platform\Tasks\Maintenance;
use bapXdb\Platform\Tasks\Migrate;
use bapXdb\Platform\Tasks\QueueRetry;
use bapXdb\Platform\Tasks\ScheduleExecutions;
use bapXdb\Platform\Tasks\ScheduleFunctions;
use bapXdb\Platform\Tasks\ScheduleMessages;
use bapXdb\Platform\Tasks\Screenshot;
use bapXdb\Platform\Tasks\SDKs;
use bapXdb\Platform\Tasks\Specs;
use bapXdb\Platform\Tasks\SSL;
use bapXdb\Platform\Tasks\StatsResources;
use bapXdb\Platform\Tasks\Upgrade;
use bapXdb\Platform\Tasks\Vars;
use bapXdb\Platform\Tasks\Version;
use Utopia\Platform\Service;

class Tasks extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_TASK;
        $this
            ->addAction(Doctor::getName(), new Doctor())
            ->addAction(Install::getName(), new Install())
            ->addAction(Maintenance::getName(), new Maintenance())
            ->addAction(Migrate::getName(), new Migrate())
            ->addAction(QueueRetry::getName(), new QueueRetry())
            ->addAction(SDKs::getName(), new SDKs())
            ->addAction(SSL::getName(), new SSL())
            ->addAction(Screenshot::getName(), new Screenshot())
            ->addAction(ScheduleFunctions::getName(), new ScheduleFunctions())
            ->addAction(ScheduleExecutions::getName(), new ScheduleExecutions())
            ->addAction(ScheduleMessages::getName(), new ScheduleMessages())
            ->addAction(Specs::getName(), new Specs())
            ->addAction(Upgrade::getName(), new Upgrade())
            ->addAction(Vars::getName(), new Vars())
            ->addAction(Version::getName(), new Version())
            ->addAction(StatsResources::getName(), new StatsResources())
        ;
    }
}
