<?php

use bapXdb\Client;
use bapXdb\Services\Users;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$users = new Users($client);

$result = $users->listIdentities(
    queries: [], // optional
    search: '<SEARCH>' // optional
);