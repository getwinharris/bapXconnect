<?php

use bapXdb\Client;
use bapXdb\Services\Users;
use bapXdb\Enums\AuthenticatorType;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('5df5acd0d48c2') // Your project ID
    ->setKey('919c2d18fb5d4...a2ae413da83346ad2'); // Your secret API key

$users = new Users($client);

$result = $users->deleteAuthenticator(
    userId: '<USER_ID>',
    type: AuthenticatorType::TOTP()
);