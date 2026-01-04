import { Client, Sites } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const sites = new Sites(client);

const result = await sites.listTemplates(
    [], // frameworks (optional)
    [], // useCases (optional)
    1, // limit (optional)
    0 // offset (optional)
);

console.log(result);
