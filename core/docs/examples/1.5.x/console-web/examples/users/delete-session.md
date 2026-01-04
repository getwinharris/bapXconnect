import { Client, Users } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const users = new Users(client);

const result = await users.deleteSession(
    '<USER_ID>', // userId
    '<SESSION_ID>' // sessionId
);

console.log(result);
