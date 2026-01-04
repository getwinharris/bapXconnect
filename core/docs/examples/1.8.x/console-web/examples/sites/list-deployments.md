import { Client, Sites } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const sites = new Sites(client);

const result = await sites.listDeployments({
    siteId: '<SITE_ID>',
    queries: [], // optional
    search: '<SEARCH>', // optional
    total: false // optional
});

console.log(result);
