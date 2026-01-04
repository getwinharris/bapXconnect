import { Client, Migrations } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const migrations = new Migrations(client);

const result = await migrations.list(
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

console.log(result);
