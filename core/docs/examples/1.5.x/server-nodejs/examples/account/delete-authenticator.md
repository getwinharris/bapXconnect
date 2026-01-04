const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
    .setSession(''); // The user session to authenticate with

const account = new sdk.Account(client);

const result = await account.deleteAuthenticator(
    sdk.AuthenticatorType.Totp, // type
    '<OTP>' // otp
);
