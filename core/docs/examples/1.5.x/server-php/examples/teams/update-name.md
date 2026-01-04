<?php

use bapXdb\Client;
use bapXdb\Services\Teams;

$client = (new Client())
    ->setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$teams = new Teams($client);

$result = $teams->updateName(
    teamId: '<TEAM_ID>',
    name: '<NAME>'
);