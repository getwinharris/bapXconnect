import { Client, Vcs } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const vcs = new Vcs(client);

const result = await vcs.listRepositories(
    '<INSTALLATION_ID>', // installationId
    '<SEARCH>' // search (optional)
);

console.log(result);
