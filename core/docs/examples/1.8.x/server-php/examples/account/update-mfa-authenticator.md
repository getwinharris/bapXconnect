<?php

use bapXdb\Client;
use bapXdb\Services\Account;
use bapXdb\Enums\AuthenticatorType;

$client = (new Client())
    ->setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    ->setProject('<YOUR_PROJECT_ID>') // Your project ID
    ->setSession(''); // The user session to authenticate with

$account = new Account($client);

$result = $account->updateMFAAuthenticator(
    type: AuthenticatorType::TOTP(),
    otp: '<OTP>'
);