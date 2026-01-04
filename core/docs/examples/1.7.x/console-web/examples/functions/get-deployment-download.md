import { Client, Functions, DeploymentDownloadType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = functions.getDeploymentDownload(
    '<FUNCTION_ID>', // functionId
    '<DEPLOYMENT_ID>', // deploymentId
    DeploymentDownloadType.Source // type (optional)
);

console.log(result);
