import { Client, Projects } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.updateAuthPasswordHistory(
    '<PROJECT_ID>', // projectId
    0 // limit
);

console.log(result);
