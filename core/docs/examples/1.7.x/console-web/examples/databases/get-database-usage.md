import { Client, Databases, DatabaseUsageRange } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.getDatabaseUsage(
    '<DATABASE_ID>', // databaseId
    DatabaseUsageRange.TwentyFourHours // range (optional)
);

console.log(result);
