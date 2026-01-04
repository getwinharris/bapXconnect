<?php

use bapXdb\Client;
use bapXdb\Services\Users;
use bapXdb\Enums\MessagingProviderType;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$users = new Users($client);

$result = $users->createTarget(
    userId: '<USER_ID>',
    targetId: '<TARGET_ID>',
    providerType: MessagingProviderType::EMAIL(),
    identifier: '<IDENTIFIER>',
    providerId: '<PROVIDER_ID>', // optional
    name: '<NAME>' // optional
);