<?php

use bapXdb\Client;
use bapXdb\Services\Functions;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$functions = new Functions($client);

$result = $functions->listExecutions(
    functionId: '<FUNCTION_ID>',
    queries: [] // optional
);