import { Client, TablesDB } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const tablesDB = new TablesDB(client);

const result = await tablesDB.listTables({
    databaseId: '<DATABASE_ID>',
    queries: [], // optional
    search: '<SEARCH>', // optional
    total: false // optional
});

console.log(result);
