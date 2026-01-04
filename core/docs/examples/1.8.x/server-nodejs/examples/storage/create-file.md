const sdk = require('node-bapxdb');
const fs = require('fs');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const storage = new sdk.Storage(client);

const result = await storage.createFile({
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    file: InputFile.fromPath('/path/to/file', 'filename'),
    permissions: [sdk.Permission.read(sdk.Role.any())] // optional
});
