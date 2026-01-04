<?php

use bapXdb\Client;
use bapXdb\Services\Account;
use bapXdb\Enums\OAuthProvider;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('5df5acd0d48c2'); // Your project ID

$account = new Account($client);

$result = $account->createOAuth2Session(
    provider: OAuthProvider::AMAZON(),
    success: 'https://example.com', // optional
    failure: 'https://example.com', // optional
    scopes: [] // optional
);