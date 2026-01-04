import { Client, Databases, UsageRange } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.listUsage({
    range: UsageRange.TwentyFourHours // optional
});

console.log(result);
