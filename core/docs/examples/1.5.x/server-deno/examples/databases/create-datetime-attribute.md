import { Client, Databases } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const databases = new Databases(client);

const response = await databases.createDatetimeAttribute(
    '<DATABASE_ID>', // databaseId
    '<COLLECTION_ID>', // collectionId
    '', // key
    false, // required
    '', // default (optional)
    false // array (optional)
);
