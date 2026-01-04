import { Client, Storage } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.getFile(
    '<BUCKET_ID>', // bucketId
    '<FILE_ID>' // fileId
);

console.log(result);
