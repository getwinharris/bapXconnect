const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new sdk.Account(client);

const result = await account.createSession(
    '<USER_ID>', // userId
    '<SECRET>' // secret
);
