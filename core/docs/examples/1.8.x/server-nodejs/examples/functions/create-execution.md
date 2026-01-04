const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const functions = new sdk.Functions(client);

const result = await functions.createExecution({
    functionId: '<FUNCTION_ID>',
    body: '<BODY>', // optional
    async: false, // optional
    path: '<PATH>', // optional
    method: sdk.ExecutionMethod.GET, // optional
    headers: {}, // optional
    scheduledAt: '<SCHEDULED_AT>' // optional
});
