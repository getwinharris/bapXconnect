<?php

use bapXdb\Client;
use bapXdb\Services\Functions;
use bapXdb\Enums\VCSDeploymentType;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$functions = new Functions($client);

$result = $functions->createVcsDeployment(
    functionId: '<FUNCTION_ID>',
    type: VCSDeploymentType::BRANCH(),
    reference: '<REFERENCE>',
    activate: false // optional
);