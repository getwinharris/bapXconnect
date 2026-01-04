import { Client, Users, UserUsageRange } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const users = new Users(client);

const result = await users.getUsage(
    UserUsageRange.TwentyFourHours // range (optional)
);

console.log(result);
