<?php

namespace bapXdb\Platform\Modules\Databases\Http\TablesDB\Transactions;

use bapXdb\Platform\Modules\Databases\Http\Databases\Transactions\Delete as TransactionsDelete;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Database\Validator\UID;
use Utopia\Swoole\Response as SwooleResponse;

class Delete extends TransactionsDelete
{
    public static function getName(): string
    {
        return 'deleteTransaction';
    }

    protected function getResponseModel(): string
    {
        return UtopiaResponse::MODEL_NONE;
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_DELETE)
            ->setHttpPath('/v1/tablesdb/transactions/:transactionId')
            ->desc('Delete transaction')
            ->groups(['api', 'database', 'transactions'])
            ->label('scope', ['documents.write', 'rows.write'])
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('sdk', new Method(
                namespace: 'tablesDB',
                group: 'transactions',
                name: 'deleteTransaction',
                description: '/docs/references/tablesdb/delete-transaction.md',
                auth: [AuthType::ADMIN, AuthType::KEY, AuthType::SESSION, AuthType::JWT],
                responses: [
                    new SDKResponse(
                        code: SwooleResponse::STATUS_CODE_NOCONTENT,
                        model: UtopiaResponse::MODEL_NONE,
                    )
                ],
                contentType: ContentType::NONE
            ))
            ->param('transactionId', '', new UID(), 'Transaction ID.')
            ->inject('response')
            ->inject('dbForProject')
            ->inject('queueForDeletes')
            ->callback($this->action(...));
    }
}
