<?php

use bapXdb\Client;
use bapXdb\Services\Account;
use bapXdb\Enums\AuthenticatorType;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('5df5acd0d48c2') // Your project ID
    ->setSession(''); // The user session to authenticate with

$account = new Account($client);

$result = $account->addAuthenticator(
    type: AuthenticatorType::TOTP()
);