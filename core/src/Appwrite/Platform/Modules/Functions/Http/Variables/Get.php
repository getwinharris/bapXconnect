<?php

namespace bapXdb\Platform\Modules\Functions\Http\Variables;

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
            ->setHttpPath('/v1/functions/:functionId/variables/:variableId')
            ->desc('Get variable')
            ->groups(['api', 'functions'])
            ->label('scope', 'functions.read')
            ->label('resourceType', RESOURCE_TYPE_FUNCTIONS)
            ->label(
                'sdk',
                new Method(
                    namespace: 'functions',
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
            ->param('functionId', '', new UID(), 'Function unique ID.', false)
            ->param('variableId', '', new UID(), 'Variable unique ID.', false)
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }

    public function action(string $functionId, string $variableId, Response $response, Database $dbForProject)
    {
        $function = $dbForProject->getDocument('functions', $functionId);

        if ($function->isEmpty()) {
            throw new Exception(Exception::FUNCTION_NOT_FOUND);
        }

        $variable = $dbForProject->getDocument('variables', $variableId);
        if (
            $variable === false ||
            $variable->isEmpty() ||
            $variable->getAttribute('resourceInternalId') !== $function->getSequence() ||
            $variable->getAttribute('resourceType') !== 'function'
        ) {
            throw new Exception(Exception::VARIABLE_NOT_FOUND);
        }

        if ($variable === false || $variable->isEmpty()) {
            throw new Exception(Exception::VARIABLE_NOT_FOUND);
        }

        $response->dynamic($variable, Response::MODEL_VARIABLE);
    }
}
