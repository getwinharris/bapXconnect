<?php

namespace bapXdb\Platform\Modules\Sites\Http\Sites;

use bapXdb\Event\Delete as DeleteEvent;
use bapXdb\Event\Event;
use bapXdb\Extend\Exception;
use bapXdb\Platform\Modules\Compute\Base;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response;
use Utopia\Database\Database;
use Utopia\Database\Validator\UID;
use Utopia\Platform\Action;
use Utopia\Platform\Scope\HTTP;

class Delete extends Base
{
    use HTTP;

    public static function getName()
    {
        return 'deleteSite';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(Action::HTTP_REQUEST_METHOD_DELETE)
            ->setHttpPath('/v1/sites/:siteId')
            ->desc('Delete site')
            ->groups(['api', 'sites'])
            ->label('scope', 'sites.write')
            ->label('resourceType', RESOURCE_TYPE_SITES)
            ->label('event', 'sites.[siteId].delete')
            ->label('audits.event', 'site.delete')
            ->label('audits.resource', 'site/{request.siteId}')
            ->label('sdk', new Method(
                namespace: 'sites',
                group: 'sites',
                name: 'delete',
                description: <<<EOT
                Delete a site by its unique ID.
                EOT,
                auth: [AuthType::ADMIN, AuthType::KEY],
                responses: [
                    new SDKResponse(
                        code: Response::STATUS_CODE_NOCONTENT,
                        model: Response::MODEL_NONE,
                    )
                ],
                contentType: ContentType::NONE
            ))
            ->param('siteId', '', new UID(), 'Site ID.')
            ->inject('response')
            ->inject('dbForProject')
            ->inject('queueForDeletes')
            ->inject('queueForEvents')
            ->callback($this->action(...));
    }

    public function action(
        string $siteId,
        Response $response,
        Database $dbForProject,
        DeleteEvent $queueForDeletes,
        Event $queueForEvents
    ) {
        $site = $dbForProject->getDocument('sites', $siteId);

        if ($site->isEmpty()) {
            throw new Exception(Exception::SITE_NOT_FOUND);
        }

        if (!$dbForProject->deleteDocument('sites', $site->getId())) {
            throw new Exception(Exception::GENERAL_SERVER_ERROR, 'Failed to remove site from DB');
        }

        $queueForDeletes
            ->setType(DELETE_TYPE_DOCUMENT)
            ->setDocument($site);

        $queueForEvents->setParam('siteId', $site->getId());

        $response->noContent();
    }
}
