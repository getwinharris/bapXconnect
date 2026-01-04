const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const sites = new sdk.Sites(client);

const result = await sites.createVcsDeployment({
    siteId: '<SITE_ID>',
    type: sdk.VCSReferenceType.Branch,
    reference: '<REFERENCE>',
    activate: false // optional
});
