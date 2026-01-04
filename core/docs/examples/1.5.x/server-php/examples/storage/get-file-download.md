<?php

use bapXdb\Client;
use bapXdb\Services\Storage;

$client = (new Client())
    ->setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$storage = new Storage($client);

$result = $storage->getFileDownload(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>'
);