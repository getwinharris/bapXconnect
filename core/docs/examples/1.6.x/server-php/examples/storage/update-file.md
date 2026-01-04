<?php

use bapXdb\Client;
use bapXdb\Services\Storage;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$storage = new Storage($client);

$result = $storage->updateFile(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    name: '<NAME>', // optional
    permissions: ["read("any")"] // optional
);