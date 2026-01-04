import { Client, Account, AuthenticatorType } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const account = new Account(client);

const result = await account.addAuthenticator(
    AuthenticatorType.Totp // type
);

console.log(response);
