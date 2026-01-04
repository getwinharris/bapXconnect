import { Client, Locale } from "react-native-bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const locale = new Locale(client);

const result = await locale.listCodes();

console.log(result);
