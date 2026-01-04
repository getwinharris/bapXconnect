import { Client, Migrations } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const migrations = new Migrations(client);

const result = await migrations.listFirebaseProjects();

console.log(response);
