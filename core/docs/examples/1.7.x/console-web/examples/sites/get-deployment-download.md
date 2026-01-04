import { Client, Sites, DeploymentDownloadType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const sites = new Sites(client);

const result = sites.getDeploymentDownload(
    '<SITE_ID>', // siteId
    '<DEPLOYMENT_ID>', // deploymentId
    DeploymentDownloadType.Source // type (optional)
);

console.log(result);
