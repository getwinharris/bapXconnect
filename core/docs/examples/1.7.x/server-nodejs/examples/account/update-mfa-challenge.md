const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const account = new sdk.Account(client);

const result = await account.updateMfaChallenge(
    '<CHALLENGE_ID>', // challengeId
    '<OTP>' // otp
);
