import { Client, Sites } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const sites = new Sites(client);

const result = await sites.getDeployment({
    siteId: '<SITE_ID>',
    deploymentId: '<DEPLOYMENT_ID>'
});

console.log(result);
