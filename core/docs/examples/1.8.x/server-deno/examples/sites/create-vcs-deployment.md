import { Client, Sites, VCSDeploymentType } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const sites = new Sites(client);

const response = await sites.createVcsDeployment({
    siteId: '<SITE_ID>',
    type: VCSDeploymentType.Branch,
    reference: '<REFERENCE>',
    activate: false // optional
});
