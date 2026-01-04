<?php

namespace bapXdb\Platform\Modules\Databases\Http\TablesDB;

use bapXdb\Platform\Modules\Databases\Http\Databases\Delete as DatabaseDelete;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Database\Validator\UID;
use Utopia\Swoole\Response as SwooleResponse;

class Delete extends DatabaseDelete
{
    public static function getName(): string
    {
        return 'deleteTablesDatabase';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_DELETE)
            ->setHttpPath('/v1/tablesdb/:databaseId')
            ->desc('Delete database')
            ->groups(['api', 'database', 'schema'])
            ->label('scope', 'databases.write')
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('event', 'databases.[databaseId].delete')
            ->label('audits.event', 'database.delete')
            ->label('audits.resource', 'database/{request.databaseId}')
            ->label('sdk', new Method(
                namespace: 'tablesDB',
                group: 'tablesdb',
                name: 'delete',
                description: '/docs/references/tablesdb/delete.md',
                auth: [AuthType::ADMIN, AuthType::KEY],
                responses: [
                    new SDKResponse(
                        code: SwooleResponse::STATUS_CODE_NOCONTENT,
                        model: UtopiaResponse::MODEL_NONE,
                    )
                ],
                contentType: ContentType::NONE
            ))
            ->param('databaseId', '', new UID(), 'Database ID.')
            ->inject('response')
            ->inject('dbForProject')
            ->inject('queueForDatabase')
            ->inject('queueForEvents')
            ->inject('queueForStatsUsage')
            ->callback($this->action(...));
    }
}
