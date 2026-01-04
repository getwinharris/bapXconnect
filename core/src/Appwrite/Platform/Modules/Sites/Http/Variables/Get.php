<?php

namespace bapXdb\Platform\Modules\Sites\Http\Variables;

use bapXdb\Extend\Exception;
use bapXdb\Platform\Modules\Compute\Base;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Database;
use Utopia\Database\Validator\UID;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class Get extends Base
{
    use HTTP;

    public static function getName()
    {
        return 'getVariable';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/sites/:siteId/variables/:variableId')
            ->desc('Get variable')
            ->groups(['api', 'sites'])
            ->label('scope', 'sites.read')
            ->label('resourceType', RESOURCE_TYPE_SITES)
            ->label(
                'sdk',
                new Method(
                    namespace: 'sites',
                    group: 'variables',
                    name: 'getVariable',
                    description: <<<EOT
                    Get a variable by its unique ID.
                    EOT,
                    auth: [AuthType::ADMIN, AuthType::KEY],
                    responses: [
                        new SDKResponse(
                            code: Response::STATUS_CODE_OK,
                            model: Response::MODEL_VARIABLE,
                        )
                    ],
                )
            )
            ->param('siteId', '', new UID(), 'Site unique ID.', false)
            ->param('variableId', '', new UID(), 'Variable unique ID.', false)
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }

    public function action(string $siteId, string $variableId, Response $response, Database $dbForProject)
    {
        $site = $dbForProject->getDocument('sites', $siteId);

        if ($site->isEmpty()) {
            throw new Exception(Exception::SITE_NOT_FOUND);
        }

        $variable = $dbForProject->getDocument('variables', $variableId);
        if (
            $variable === false ||
            $variable->isEmpty() ||
            $variable->getAttribute('resourceInternalId') !== $site->getSequence() ||
            $variable->getAttribute('resourceType') !== 'site'
        ) {
            throw new Exception(Exception::VARIABLE_NOT_FOUND);
        }

        if ($variable === false || $variable->isEmpty()) {
            throw new Exception(Exception::VARIABLE_NOT_FOUND);
        }

        $response->dynamic($variable, Response::MODEL_VARIABLE);
    }
}
