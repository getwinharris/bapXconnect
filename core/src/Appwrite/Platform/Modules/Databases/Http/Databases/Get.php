<?php

namespace bapXdb\Platform\Modules\Databases\Http\Databases;

use bapXdb\Extend\Exception;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Deprecated;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Database\Database;
use Utopia\Database\Validator\UID;
use Utopia\Platform\Action;
use Utopia\Swoole\Response as SwooleResponse;

class Get extends Action
{
    public static function getName(): string
    {
        return 'getDatabase';
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/databases/:databaseId')
            ->desc('Get database')
            ->groups(['api', 'database'])
            ->label('scope', 'databases.read')
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('sdk', [
                new Method(
                    namespace: 'databases',
                    group: 'databases',
                    name: 'get',
                    description: '/docs/references/databases/get.md',
                    auth: [AuthType::ADMIN, AuthType::KEY],
                    responses: [
                        new SDKResponse(
                            code: SwooleResponse::STATUS_CODE_OK,
                            model: UtopiaResponse::MODEL_DATABASE,
                        )
                    ],
                    contentType: ContentType::JSON,
                    deprecated: new Deprecated(
                        since: '1.8.0',
                        replaceWith: 'tablesDB.get',
                    )
                ),
            ])
            ->param('databaseId', '', new UID(), 'Database ID.')
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }

    public function action(string $databaseId, UtopiaResponse $response, Database $dbForProject): void
    {
        $database = $dbForProject->getDocument('databases', $databaseId);

        if ($database->isEmpty()) {
            throw new Exception(Exception::DATABASE_NOT_FOUND, params: [$databaseId]);
        }

        $response->dynamic($database, UtopiaResponse::MODEL_DATABASE);
    }
}
