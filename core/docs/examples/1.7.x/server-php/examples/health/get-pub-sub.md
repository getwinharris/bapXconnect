<?php

use bapXdb\Client;
use bapXdb\Services\Health;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setKey('<YOUR_API_KEY>'); // Your secret API key

$health = new Health($client);

$result = $health->getPubSub();
