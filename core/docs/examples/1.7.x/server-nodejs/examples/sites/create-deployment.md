const sdk = require('node-bapxdb');
const fs = require('fs');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const sites = new sdk.Sites(client);

const result = await sites.createDeployment(
    '<SITE_ID>', // siteId
    InputFile.fromPath('/path/to/file', 'filename'), // code
    false, // activate
    '<INSTALL_COMMAND>', // installCommand (optional)
    '<BUILD_COMMAND>', // buildCommand (optional)
    '<OUTPUT_DIRECTORY>' // outputDirectory (optional)
);
