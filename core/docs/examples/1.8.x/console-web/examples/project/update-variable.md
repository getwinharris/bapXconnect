import { Client, Project } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const project = new Project(client);

const result = await project.updateVariable({
    variableId: '<VARIABLE_ID>',
    key: '<KEY>',
    value: '<VALUE>', // optional
    secret: false // optional
});

console.log(result);
