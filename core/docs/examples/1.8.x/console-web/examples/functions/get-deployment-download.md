import { Client, Functions, DeploymentDownloadType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = functions.getDeploymentDownload({
    functionId: '<FUNCTION_ID>',
    deploymentId: '<DEPLOYMENT_ID>',
    type: DeploymentDownloadType.Source // optional
});

console.log(result);
