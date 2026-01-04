import { Client, Account, AuthenticatorType } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createMFAAuthenticator({
    type: AuthenticatorType.Totp
});

console.log(result);
