import { Client, Users } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const users = new Users(client);

const result = await users.createJWT({
    userId: '<USER_ID>',
    sessionId: '<SESSION_ID>', // optional
    duration: 0 // optional
});

console.log(result);
