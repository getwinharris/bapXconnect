<?php

use bapXdb\Client;
use bapXdb\Services\Functions;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$functions = new Functions($client);

$result = $functions->createExecution(
    functionId: '<FUNCTION_ID>',
    body: '<BODY>', // optional
    async: false, // optional
    path: '<PATH>', // optional
    method: ExecutionMethod::GET(), // optional
    headers: [], // optional
    scheduledAt: '' // optional
);