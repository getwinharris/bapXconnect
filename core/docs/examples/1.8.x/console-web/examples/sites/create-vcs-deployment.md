import { Client, Sites, VCSReferenceType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const sites = new Sites(client);

const result = await sites.createVcsDeployment({
    siteId: '<SITE_ID>',
    type: VCSReferenceType.Branch,
    reference: '<REFERENCE>',
    activate: false // optional
});

console.log(result);
