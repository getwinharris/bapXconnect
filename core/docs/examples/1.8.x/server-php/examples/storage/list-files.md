<?php

use bapXdb\Client;
use bapXdb\Services\Storage;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$storage = new Storage($client);

$result = $storage->listFiles(
    bucketId: '<BUCKET_ID>',
    queries: [], // optional
    search: '<SEARCH>', // optional
    total: false // optional
);