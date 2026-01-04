<?php

use bapXdb\Client;
use bapXdb\Services\TablesDB;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$tablesDB = new TablesDB($client);

$result = $tablesDB->getRow(
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    rowId: '<ROW_ID>',
    queries: [], // optional
    transactionId: '<TRANSACTION_ID>' // optional
);