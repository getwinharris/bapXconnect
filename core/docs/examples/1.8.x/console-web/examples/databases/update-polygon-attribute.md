import { Client, Databases } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.updatePolygonAttribute({
    databaseId: '<DATABASE_ID>',
    collectionId: '<COLLECTION_ID>',
    key: '',
    required: false,
    default: [[[1, 2], [3, 4], [5, 6], [1, 2]]], // optional
    newKey: '' // optional
});

console.log(result);
