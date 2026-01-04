import { Client, Functions } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = await functions.listDeployments({
    functionId: '<FUNCTION_ID>',
    queries: [], // optional
    search: '<SEARCH>', // optional
    total: false // optional
});

console.log(result);
