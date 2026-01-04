import { Client, Health } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const health = new Health(client);

const result = await health.getQueueBuilds(
    null // threshold (optional)
);

console.log(result);
