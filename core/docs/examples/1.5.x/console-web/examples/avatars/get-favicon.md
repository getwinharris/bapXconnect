import { Client, Avatars } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const avatars = new Avatars(client);

const result = avatars.getFavicon(
    'https://example.com' // url
);

console.log(result);
