<?php

use bapXdb\Client;
use bapXdb\Services\Storage;
use bapXdb\Enums\Compression;
use bapXdb\Permission;
use bapXdb\Role;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$storage = new Storage($client);

$result = $storage->updateBucket(
    bucketId: '<BUCKET_ID>',
    name: '<NAME>',
    permissions: [Permission::read(Role::any())], // optional
    fileSecurity: false, // optional
    enabled: false, // optional
    maximumFileSize: 1, // optional
    allowedFileExtensions: [], // optional
    compression: Compression::NONE(), // optional
    encryption: false, // optional
    antivirus: false, // optional
    transformations: false // optional
);