const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new sdk.Account(client);

const result = await account.createPhoneToken(
    '<USER_ID>', // userId
    '+12065550100' // phone
);
