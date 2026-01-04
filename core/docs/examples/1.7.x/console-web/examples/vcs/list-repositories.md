import { Client, Vcs, VCSDetectionType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const vcs = new Vcs(client);

const result = await vcs.listRepositories(
    '<INSTALLATION_ID>', // installationId
    VCSDetectionType.Runtime, // type
    '<SEARCH>' // search (optional)
);

console.log(result);
