import { Client, Functions } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = await functions.createDuplicateDeployment({
    functionId: '<FUNCTION_ID>',
    deploymentId: '<DEPLOYMENT_ID>',
    buildId: '<BUILD_ID>' // optional
});

console.log(result);
