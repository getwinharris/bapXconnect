import { Client, Account } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createSession({
    userId: '<USER_ID>',
    secret: '<SECRET>'
});

console.log(result);
