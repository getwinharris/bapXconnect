<?php

namespace bapXdb\Platform\Modules\Databases\Http\TablesDB\Transactions;

use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\XList as TransactionsList;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Database\Validator\Queries\Transactions;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Swoole\Response as SwooleResponse;

class XList extends TransactionsList
{
    public static function getName(): string
    {
        return 'listTransactions';
    }

    protected function getResponseModel(): string
    {
        return UtopiaResponse::MODEL_TRANSACTION_LIST;
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/tablesdb/transactions')
            ->desc('List transactions')
            ->groups(['api', 'database', 'transactions'])
            ->label('scope', ['documents.read', 'rows.read'])
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('sdk', new Method(
                namespace: 'tablesDB',
                group: 'transactions',
                name: 'listTransactions',
                description: '/docs/references/tablesdb/list-transactions.md',
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
}
