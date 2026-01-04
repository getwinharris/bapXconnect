<?php

use bapXdb\Client;
use bapXdb\Services\Account;

$client = (new Client())
    ->setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$account = new Account($client);

$result = $account->updateName(
    name: '<NAME>'
);