import { Client, Avatars } from "bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const avatars = new Avatars(client);

const result = avatars.getImage(
    'https://example.com', // url
    0, // width (optional)
    0 // height (optional)
);

console.log(result);
