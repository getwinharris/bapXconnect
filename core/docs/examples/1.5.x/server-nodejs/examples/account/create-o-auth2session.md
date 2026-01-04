const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const account = new sdk.Account(client);

const response = await account.createOAuth2Session(
    sdk.OAuthProvider.Amazon, // provider
    'https://example.com', // success (optional)
    'https://example.com', // failure (optional)
    [] // scopes (optional)
);
