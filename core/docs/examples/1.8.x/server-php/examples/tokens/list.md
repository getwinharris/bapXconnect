<?php

use bapXdb\Client;
use bapXdb\Services\Tokens;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$tokens = new Tokens($client);

$result = $tokens->list(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    queries: [], // optional
    total: false // optional
);