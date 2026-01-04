import { Client, Storage } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.getBucket(
    '<BUCKET_ID>' // bucketId
);

console.log(result);
