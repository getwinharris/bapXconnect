<?php

namespace bapXdb\Platform\Modules\Sites\Http\Variables;

use bapXdb\Extend\Exception;
use bapXdb\Platform\Modules\Compute\Base;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Database;
use Utopia\Database\Document;
use Utopia\Database\Validator\UID;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class XList extends Base
{
    use HTTP;

    public static function getName()
    {
        return 'listVariables';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/sites/:siteId/variables')
            ->desc('List variables')
            ->groups(['api', 'sites'])
            ->label('scope', 'sites.read')
            ->label('resourceType', RESOURCE_TYPE_SITES)
            ->label(
                'sdk',
                new Method(
                    namespace: 'sites',
                    group: 'variables',
                    name: 'listVariables',
                    description: <<<EOT
                    Get a list of all variables of a specific site.
                    EOT,
                    auth: [AuthType::ADMIN, AuthType::KEY],
                    responses: [
                        new SDKResponse(
                            code: Response::STATUS_CODE_OK,
                            model: Response::MODEL_VARIABLE_LIST,
                        )
                    ],
                )
            )
            ->param('siteId', '', new UID(), 'Site unique ID.', false)
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }

    public function action(
        string $siteId,
        Response $response,
        Database $dbForProject
    ) {
        $site = $dbForProject->getDocument('sites', $siteId);

        if ($site->isEmpty()) {
            throw new Exception(Exception::SITE_NOT_FOUND);
        }

        $response->dynamic(new Document([
            'variables' => $site->getAttribute('vars', []),
            'total' => \count($site->getAttribute('vars', [])),
        ]), Response::MODEL_VARIABLE_LIST);
    }
}
