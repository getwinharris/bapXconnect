<?php

use bapXdb\Client;
use bapXdb\Services\TablesDB;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$tablesDB = new TablesDB($client);

$result = $tablesDB->updateIntegerColumn(
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    key: '',
    required: false,
    default: null,
    min: null, // optional
    max: null, // optional
    newKey: '' // optional
);