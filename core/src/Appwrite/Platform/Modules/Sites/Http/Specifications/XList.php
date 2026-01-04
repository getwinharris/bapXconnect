<?php

namespace bapXdb\Platform\Modules\Sites\Http\Specifications;

use bapXdb\Platform\Modules\Compute\Base;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Config\Config;
use Utopia\Database\Document;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;
use Utopia\System\System;

class XList extends Base
{
    use HTTP;

    public static function getName()
    {
        return 'listSpecifications';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/sites/specifications')
            ->groups(['api', 'sites'])
            ->desc('List specifications')
            ->label('scope', 'sites.read')
            ->label('resourceType', RESOURCE_TYPE_SITES)
            ->label('sdk', new Method(
                namespace: 'sites',
                group: 'frameworks',
                name: 'listSpecifications',
                description: <<<EOT
                List allowed site specifications for this instance.
                EOT,
                auth: [AuthType::KEY, AuthType::ADMIN],
                responses: [
                    new SDKResponse(
                        code: Response::STATUS_CODE_OK,
                        model: Response::MODEL_SPECIFICATION_LIST,
                    )
                ]
            ))
            ->inject('response')
            ->inject('plan')
            ->callback($this->action(...));
    }

    public function action(Response $response, array $plan)
    {
        $allSpecs = Config::getParam('specifications', []);

        $specs = [];
        foreach ($allSpecs as $spec) {
            $spec['enabled'] = true;

            if (array_key_exists('runtimeSpecifications', $plan)) {
                $spec['enabled'] = in_array($spec['slug'], $plan['runtimeSpecifications']);
            }

            $maxCpus = System::getEnv('_APP_COMPUTE_CPUS', 0);
            $maxMemory = System::getEnv('_APP_COMPUTE_MEMORY', 0);

            // Only add specs that are within the limits set by environment variables
            // Treat 0 as no limit
            if ((empty($maxCpus) || $spec['cpus'] <= $maxCpus) && (empty($maxMemory) || $spec['memory'] <= $maxMemory)) {
                $specs[] = $spec;
            }
        }

        $response->dynamic(new Document([
            'specifications' => $specs,
            'total' => count($specs)
        ]), Response::MODEL_SPECIFICATION_LIST);
    }
}
