import { Client, Databases } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const databases = new Databases(client);

const response = await databases.updateDocument({
    databaseId: '<DATABASE_ID>',
    collectionId: '<COLLECTION_ID>',
    documentId: '<DOCUMENT_ID>',
    data: {}, // optional
    permissions: ["read("any")"] // optional
});
