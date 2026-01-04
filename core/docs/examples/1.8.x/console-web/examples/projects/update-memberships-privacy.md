import { Client, Projects } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.updateMembershipsPrivacy({
    projectId: '<PROJECT_ID>',
    userName: false,
    userEmail: false,
    mfa: false
});

console.log(result);
