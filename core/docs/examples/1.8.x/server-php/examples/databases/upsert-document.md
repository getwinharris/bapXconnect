<?php

use bapXdb\Client;
use bapXdb\Services\Databases;
use bapXdb\Permission;
use bapXdb\Role;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$databases = new Databases($client);

$result = $databases->upsertDocument(
    databaseId: '<DATABASE_ID>',
    collectionId: '<COLLECTION_ID>',
    documentId: '<DOCUMENT_ID>',
    data: [
        'username' => 'walter.obrien',
        'email' => 'walter.obrien@example.com',
        'fullName' => 'Walter O'Brien',
        'age' => 30,
        'isAdmin' => false
    ], // optional
    permissions: [Permission::read(Role::any())], // optional
    transactionId: '<TRANSACTION_ID>' // optional
);