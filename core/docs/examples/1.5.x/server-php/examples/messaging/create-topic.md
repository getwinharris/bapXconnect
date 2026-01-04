<?php

use bapXdb\Client;
use bapXdb\Services\Messaging;

$client = (new Client())
    ->setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$messaging = new Messaging($client);

$result = $messaging->createTopic(
    topicId: '<TOPIC_ID>',
    name: '<NAME>',
    subscribe: ["any"] // optional
);