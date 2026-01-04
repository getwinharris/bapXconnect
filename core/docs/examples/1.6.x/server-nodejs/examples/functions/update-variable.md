const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const functions = new sdk.Functions(client);

const result = await functions.updateVariable(
    '<FUNCTION_ID>', // functionId
    '<VARIABLE_ID>', // variableId
    '<KEY>', // key
    '<VALUE>' // value (optional)
);
