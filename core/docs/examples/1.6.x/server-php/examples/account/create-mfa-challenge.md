<?php

use bapXdb\Client;
use bapXdb\Services\Account;
use bapXdb\Enums\AuthenticationFactor;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>'); // Your project ID

$account = new Account($client);

$result = $account->createMfaChallenge(
    factor: AuthenticationFactor::EMAIL()
);