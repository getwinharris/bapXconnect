<?php

use bapXdb\Client;
use bapXdb\Services\Avatars;
use bapXdb\Enums\Flag;

$client = (new Client())
    ->setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$avatars = new Avatars($client);

$result = $avatars->getFlag(
    code: Flag::AFGHANISTAN(),
    width: 0, // optional
    height: 0, // optional
    quality: 0 // optional
);