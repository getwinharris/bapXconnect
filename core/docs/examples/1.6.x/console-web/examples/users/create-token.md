import { Client, Users } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const users = new Users(client);

const result = await users.createToken(
    '<USER_ID>', // userId
    4, // length (optional)
    60 // expire (optional)
);

console.log(result);
