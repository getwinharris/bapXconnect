<?php

namespace bapXdb\Platform\Modules\Databases\Http\TablesDB;

use bapXdb\Platform\Modules\Databases\Http\Databases\XList as DatabaseXList;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Database\Validator\Queries\Databases;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Swoole\Response as SwooleResponse;
use Utopia\Validator\Boolean;
use Utopia\Validator\Text;

class XList extends DatabaseXList
{
    public static function getName(): string
    {
        return 'listTablesDatabases';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/tablesdb')
            ->desc('List databases')
            ->groups(['api', 'database'])
            ->label('scope', 'databases.read')
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('sdk', new Method(
                namespace: 'tablesDB',
                group: 'tablesdb',
                name: 'list',
                description: '/docs/references/tablesdb/list.md',
                auth: [AuthType::ADMIN, AuthType::KEY],
                responses: [
                    new SDKResponse(
                        code: SwooleResponse::STATUS_CODE_OK,
                        model: UtopiaResponse::MODEL_DATABASE_LIST,
                    )
                ],
                contentType: ContentType::JSON
            ))
            ->param('queries', [], new Databases(), 'Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://bapxdb.io/docs/queries). Maximum of ' . APP_LIMIT_ARRAY_PARAMS_SIZE . ' queries are allowed, each ' . APP_LIMIT_ARRAY_ELEMENT_SIZE . ' characters long. You may filter on the following columns: ' . implode(', ', Databases::ALLOWED_ATTRIBUTES), true)
            ->param('search', '', new Text(256), 'Search term to filter your list results. Max length: 256 chars.', true)
            ->param('total', true, new Boolean(true), 'When set to false, the total count returned will be 0 and will not be calculated.', true)
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }
}
