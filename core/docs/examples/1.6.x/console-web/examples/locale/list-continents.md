import { Client, Locale } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const locale = new Locale(client);

const result = await locale.listContinents();

console.log(result);
