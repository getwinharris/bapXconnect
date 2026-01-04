<?php

use bapXdb\Client;
use bapXdb\Services\Avatars;

$client = (new Client())
    ->setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$avatars = new Avatars($client);

$result = $avatars->getFavicon(
    url: 'https://example.com'
);