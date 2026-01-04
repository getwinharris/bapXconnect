<?php

namespace bapXdb\Platform\Modules\Databases\Http\Databases\Transactions;

use bapXdb\Extend\Exception;
use bapXdb\SDK\AuthType;
use bapXdb\SDK\ContentType;
use bapXdb\SDK\Method;
use bapXdb\SDK\Response as SDKResponse;
use bapXdb\Utopia\Response as UtopiaResponse;
use Utopia\Database\Database;
use Utopia\Database\Validator\UID;
use Utopia\Swoole\Response as SwooleResponse;

class Get extends Action
{
    public static function getName(): string
    {
        return 'getDatabasesTransaction';
    }

    protected function getResponseModel(): string
    {
        return UtopiaResponse::MODEL_TRANSACTION;
    }

    public function __construct()
    {
        $this
            ->setHttpMethod(self::HTTP_REQUEST_METHOD_GET)
            ->setHttpPath('/v1/databases/transactions/:transactionId')
            ->desc('Get transaction')
            ->groups(['api', 'database', 'transactions'])
            ->label('scope', 'rows.read')
            ->label('resourceType', RESOURCE_TYPE_DATABASES)
            ->label('sdk', new Method(
                namespace: 'databases',
                group: 'transactions',
                name: 'getTransaction',
                description: '/docs/references/databases/get-transaction.md',
                auth: [AuthType::ADMIN, AuthType::KEY, AuthType::SESSION, AuthType::JWT],
                responses: [
                    new SDKResponse(
                        code: SwooleResponse::STATUS_CODE_OK,
                        model: UtopiaResponse::MODEL_TRANSACTION,
                    )
                ],
                contentType: ContentType::JSON
            ))
            ->param('transactionId', '', new UID(), 'Transaction ID.')
            ->inject('response')
            ->inject('dbForProject')
            ->callback($this->action(...));
    }

    public function action(string $transactionId, UtopiaResponse $response, Database $dbForProject): void
    {
        $transaction = $dbForProject->getDocument('transactions', $transactionId);

        if ($transaction->isEmpty()) {
            throw new Exception(Exception::TRANSACTION_NOT_FOUND, params: [$transactionId]);
        }

        $response
            ->setStatusCode(SwooleResponse::STATUS_CODE_OK)
            ->dynamic($transaction, UtopiaResponse::MODEL_TRANSACTION);
    }
}
