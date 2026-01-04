const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const storage = new sdk.Storage(client);

const result = await storage.getFileView(
    '<BUCKET_ID>', // bucketId
    '<FILE_ID>' // fileId
);
