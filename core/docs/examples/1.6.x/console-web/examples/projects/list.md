import { Client, Projects } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.list(
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

console.log(result);
