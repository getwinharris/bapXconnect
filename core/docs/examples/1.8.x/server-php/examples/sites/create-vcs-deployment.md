<?php

use bapXdb\Client;
use bapXdb\Services\Sites;
use bapXdb\Enums\VCSReferenceType;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$sites = new Sites($client);

$result = $sites->createVcsDeployment(
    siteId: '<SITE_ID>',
    type: VCSReferenceType::BRANCH(),
    reference: '<REFERENCE>',
    activate: false // optional
);