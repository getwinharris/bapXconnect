import { Client, Users, AuthenticatorType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const users = new Users(client);

const result = await users.deleteAuthenticator(
    '<USER_ID>', // userId
    AuthenticatorType.Totp // type
);

console.log(response);
