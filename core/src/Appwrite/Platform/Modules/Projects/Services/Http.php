<?php

namespace bapXdb\Platform\Modules\Projects\Services;

use bapXdb\Platform\Modules\Projects\Http\DevKeys\Create as CreateDevKey;
use bapXdb\Platform\Modules\Projects\Http\DevKeys\Delete as DeleteDevKey;
use bapXdb\Platform\Modules\Projects\Http\DevKeys\Get as GetDevKey;
use bapXdb\Platform\Modules\Projects\Http\DevKeys\Update as UpdateDevKey;
use bapXdb\Platform\Modules\Projects\Http\DevKeys\XList as ListDevKeys;
use bapXdb\Platform\Modules\Projects\Http\Projects\XList as ListProjects;
use Utopia\Platform\Service;

class Http extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_HTTP;
        $this->addAction(CreateDevKey::getName(), new CreateDevKey());
        $this->addAction(UpdateDevKey::getName(), new UpdateDevKey());
        $this->addAction(GetDevKey::getName(), new GetDevKey());
        $this->addAction(ListDevKeys::getName(), new ListDevKeys());
        $this->addAction(DeleteDevKey::getName(), new DeleteDevKey());

        $this->addAction(ListProjects::getName(), new ListProjects());
    }
}
