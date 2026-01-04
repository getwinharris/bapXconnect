import { Client, Databases, RelationMutate } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.updateRelationshipAttribute(
    '<DATABASE_ID>', // databaseId
    '<COLLECTION_ID>', // collectionId
    '', // key
    RelationMutate.Cascade, // onDelete (optional)
    '' // newKey (optional)
);

console.log(result);
