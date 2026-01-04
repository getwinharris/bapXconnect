import { Client, Account } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createPhoneToken({
    userId: '<USER_ID>',
    phone: '+12065550100'
});

console.log(result);
