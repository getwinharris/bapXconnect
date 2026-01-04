import { Client, Functions } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = await functions.listExecutions({
    functionId: '<FUNCTION_ID>',
    queries: [], // optional
    total: false // optional
});

console.log(result);
