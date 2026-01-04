import { Client, Databases } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setKey(''); // 

const databases = new Databases(client);

const result = await databases.createDocuments(
    '<DATABASE_ID>', // databaseId
    '<COLLECTION_ID>', // collectionId
    [] // documents
);

console.log(result);
