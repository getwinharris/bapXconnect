import { Client, Storage, StorageUsageRange } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.getUsage(
    StorageUsageRange.TwentyFourHours // range (optional)
);

console.log(result);
