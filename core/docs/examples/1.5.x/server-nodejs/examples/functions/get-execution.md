const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const functions = new sdk.Functions(client);

const result = await functions.getExecution(
    '<FUNCTION_ID>', // functionId
    '<EXECUTION_ID>' // executionId
);
