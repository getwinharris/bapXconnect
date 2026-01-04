<?php

namespace bapXdb\Platform\Modules\Functions\Services;

use bapXdb\Platform\Modules\Functions\Http\Deployments\Create as CreateDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Delete as DeleteDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Download\Get as DownloadDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Duplicate\Create as CreateDuplicateDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Get as GetDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Status\Update as UpdateDeploymentStatus;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Template\Create as CreateTemplateDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\Vcs\Create as CreateVcsDeployment;
use bapXdb\Platform\Modules\Functions\Http\Deployments\XList as ListDeployments;
use bapXdb\Platform\Modules\Functions\Http\Executions\Create as CreateExecution;
use bapXdb\Platform\Modules\Functions\Http\Executions\Delete as DeleteExecution;
use bapXdb\Platform\Modules\Functions\Http\Executions\Get as GetExecution;
use bapXdb\Platform\Modules\Functions\Http\Executions\XList as ListExecutions;
use bapXdb\Platform\Modules\Functions\Http\Functions\Create as CreateFunction;
use bapXdb\Platform\Modules\Functions\Http\Functions\Delete as DeleteFunction;
use bapXdb\Platform\Modules\Functions\Http\Functions\Deployment\Update as UpdateFunctionDeployment;
use bapXdb\Platform\Modules\Functions\Http\Functions\Get as GetFunction;
use bapXdb\Platform\Modules\Functions\Http\Functions\Update as UpdateFunction;
use bapXdb\Platform\Modules\Functions\Http\Functions\XList as ListFunctions;
use bapXdb\Platform\Modules\Functions\Http\Runtimes\XList as ListRuntimes;
use bapXdb\Platform\Modules\Functions\Http\Specifications\XList as ListSpecifications;
use bapXdb\Platform\Modules\Functions\Http\Templates\Get as GetTemplate;
use bapXdb\Platform\Modules\Functions\Http\Templates\XList as ListTemplates;
use bapXdb\Platform\Modules\Functions\Http\Usage\Get as GetUsage;
use bapXdb\Platform\Modules\Functions\Http\Usage\XList as ListUsage;
use bapXdb\Platform\Modules\Functions\Http\Variables\Create as CreateVariable;
use bapXdb\Platform\Modules\Functions\Http\Variables\Delete as DeleteVariable;
use bapXdb\Platform\Modules\Functions\Http\Variables\Get as GetVariable;
use bapXdb\Platform\Modules\Functions\Http\Variables\Update as UpdateVariable;
use bapXdb\Platform\Modules\Functions\Http\Variables\XList as ListVariables;
use Utopia\Platform\Service;

class Http extends Service
{
    public function __construct()
    {
        $this->type = Service::TYPE_HTTP;

        // Functions
        $this->addAction(CreateFunction::getName(), new CreateFunction());
        $this->addAction(GetFunction::getName(), new GetFunction());
        $this->addAction(UpdateFunction::getName(), new UpdateFunction());
        $this->addAction(ListFunctions::getName(), new ListFunctions());
        $this->addAction(DeleteFunction::getName(), new DeleteFunction());

        // Runtimes
        $this->addAction(ListRuntimes::getName(), new ListRuntimes());

        // Specifications
        $this->addAction(ListSpecifications::getName(), new ListSpecifications());

        // Deployments
        $this->addAction(CreateDeployment::getName(), new CreateDeployment());
        $this->addAction(GetDeployment::getName(), new GetDeployment());
        $this->addAction(UpdateFunctionDeployment::getName(), new UpdateFunctionDeployment());
        $this->addAction(ListDeployments::getName(), new ListDeployments());
        $this->addAction(DeleteDeployment::getName(), new DeleteDeployment());
        $this->addAction(CreateTemplateDeployment::getName(), new CreateTemplateDeployment());
        $this->addAction(CreateVcsDeployment::getName(), new CreateVcsDeployment());
        $this->addAction(DownloadDeployment::getName(), new DownloadDeployment());
        $this->addAction(CreateDuplicateDeployment::getName(), new CreateDuplicateDeployment());
        $this->addAction(UpdateDeploymentStatus::getName(), new UpdateDeploymentStatus());

        // Executions
        $this->addAction(CreateExecution::getName(), new CreateExecution());
        $this->addAction(GetExecution::getName(), new GetExecution());
        $this->addAction(ListExecutions::getName(), new ListExecutions());
        $this->addAction(DeleteExecution::getName(), new DeleteExecution());

        // Usage
        $this->addAction(GetUsage::getName(), new GetUsage());
        $this->addAction(ListUsage::getName(), new ListUsage());

        // Variables
        $this->addAction(CreateVariable::getName(), new CreateVariable());
        $this->addAction(GetVariable::getName(), new GetVariable());
        $this->addAction(ListVariables::getName(), new ListVariables());
        $this->addAction(UpdateVariable::getName(), new UpdateVariable());
        $this->addAction(DeleteVariable::getName(), new DeleteVariable());

        // Templates
        $this->addAction(GetTemplate::getName(), new GetTemplate());
        $this->addAction(ListTemplates::getName(), new ListTemplates());
    }
}
