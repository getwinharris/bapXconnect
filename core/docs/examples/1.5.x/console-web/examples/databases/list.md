import { Client, Databases } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.list(
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

console.log(result);
