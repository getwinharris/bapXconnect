<?php

namespace bapXdb\Platform\Modules\Databases\Http\Databases\Transactions;

use bapXdb\Extend\Exception;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Database\Validator\Queries\Transactions;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Database\Database;
use Utopia\Database\Document;
use Utopia\Database\Exception\Query as QueryException;
use Utopia\Database\Query;
use Utopia\Swoole\Response as SwooleResponse;

class XList extends Action
{
    public static function getName(): string
    {
        return 'listDatabasesTransactions';
    }

    protected function getResponseModel(): string
    {
        return UtopiaResponse::MODEL_TRANSACTION_LIST;
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/databases/transactions')
            ->desc('List transactions')
            ->groups(['api', 'database', 'transactions'])
            ->label('scope', 'rows.read')
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('sdk', new Method(
                namespace: 'databases',
                group: 'transactions',
                name: 'listTransactions',
                description: '/docs/references/databases/list-transactions.md',
                auth: [AuthType::ADMIN, AuthType::KEY, AuthType::SESSION, AuthType::JWT],
                responses: [
                    new SDKResponse(
                        code: SwooleResponse::STATUS_CODE_OK,
                        model: UtopiaResponse::MODEL_TRANSACTION_LIST,
                    )
                ],
                contentType: ContentType::JSON
            ))
            ->param('queries', [], new Transactions(), 'Array of query strings generated using the Query class provided by the SDK. [Learn more about queries](https://bapxdb.io/docs/queries).', true)
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }

    public function action(array $queries, UtopiaResponse $response, Database $dbForProject): void
    {
        try {
            $queries = Query::parseQueries($queries);
        } catch (QueryException $e) {
            throw new Exception(Exception::GENERAL_QUERY_INVALID, $e->getMessage());
        }

        $response->dynamic(new Document([
            'transactions' => $dbForProject->find('transactions', $queries),
            'total' => $dbForProject->count('transactions', $queries),
        ]), UtopiaResponse::MODEL_TRANSACTION_LIST);
    }
}
