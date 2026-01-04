import { Client, Storage } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const storage = new Storage(client);

const result = storage.getFileView({
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    token: '<TOKEN>' // optional
});
