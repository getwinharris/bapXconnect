import { Client, Users } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const users = new Users(client);

const result = await users.listMemberships(
    '<USER_ID>', // userId
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

console.log(result);
