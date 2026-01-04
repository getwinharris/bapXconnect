import { Client, Projects } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.deleteWebhook(
    '<PROJECT_ID>', // projectId
    '<WEBHOOK_ID>' // webhookId
);

console.log(result);
