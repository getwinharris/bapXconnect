import { Client, Account } from "@bapxdb.io/console";

const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

// Go to OAuth provider login page
account.createOAuth2Session('amazon');

