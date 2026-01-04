import { Client, Locale } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const locale = new Locale(client);

const result = await locale.listCurrencies();

console.log(result);
