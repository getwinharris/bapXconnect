import { Client, Account, AuthenticationFactor } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const account = new Account(client);

const response = await account.create2FAChallenge(
    AuthenticationFactor.Totp // factor
);

console.log(response);
