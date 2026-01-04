import { Client, Avatars } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const avatars = new Avatars(client);

const result = avatars.getImage({
    url: 'https://example.com',
    width: 0, // optional
    height: 0 // optional
});

console.log(result);
