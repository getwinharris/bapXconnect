<?php

use bapXdb\Client;
use bapXdb\Services\Functions;
use bapXdb\Enums\ExecutionMethod;

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
    scheduledAt: '<SCHEDULED_AT>' // optional
);