import { Client, Users, AuthenticatorType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const users = new Users(client);

const result = await users.deleteMFAAuthenticator({
    userId: '<USER_ID>',
    type: AuthenticatorType.Totp
});

console.log(result);
