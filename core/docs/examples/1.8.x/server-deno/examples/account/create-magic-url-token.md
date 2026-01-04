import { Client, Account } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const response = await account.createMagicURLToken({
    userId: '<USER_ID>',
    email: 'email@example.com',
    url: 'https://example.com', // optional
    phrase: false // optional
});
