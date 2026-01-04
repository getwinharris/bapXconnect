const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const tokens = new sdk.Tokens(client);

const result = await tokens.createFileToken({
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    expire: '' // optional
});
