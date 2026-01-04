<?php

use bapXdb\Client;
use bapXdb\InputFile;
use bapXdb\Services\Storage;
use bapXdb\Permission;
use bapXdb\Role;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$storage = new Storage($client);

$result = $storage->createFile(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    file: InputFile::withPath('file.png'),
    permissions: [Permission::read(Role::any())] // optional
);