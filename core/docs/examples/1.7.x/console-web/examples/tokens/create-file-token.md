import { Client, Tokens } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const tokens = new Tokens(client);

const result = await tokens.createFileToken(
    '<BUCKET_ID>', // bucketId
    '<FILE_ID>', // fileId
    '' // expire (optional)
);

console.log(result);
