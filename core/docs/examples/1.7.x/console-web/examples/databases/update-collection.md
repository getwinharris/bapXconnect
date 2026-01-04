import { Client, Databases } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.updateCollection(
    '<DATABASE_ID>', // databaseId
    '<COLLECTION_ID>', // collectionId
    '<NAME>', // name
    ["read("any")"], // permissions (optional)
    false, // documentSecurity (optional)
    false // enabled (optional)
);

console.log(result);
