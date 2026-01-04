import { Client, Projects } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.updateKey({
    projectId: '<PROJECT_ID>',
    keyId: '<KEY_ID>',
    name: '<NAME>',
    scopes: [],
    expire: '' // optional
});

console.log(result);
