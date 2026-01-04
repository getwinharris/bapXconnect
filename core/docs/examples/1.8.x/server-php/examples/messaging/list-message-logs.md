<?php

use bapXdb\Client;
use bapXdb\Services\Messaging;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$messaging = new Messaging($client);

$result = $messaging->listMessageLogs(
    messageId: '<MESSAGE_ID>',
    queries: [], // optional
    total: false // optional
);