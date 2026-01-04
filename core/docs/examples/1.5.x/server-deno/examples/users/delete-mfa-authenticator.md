import { Client, Users, AuthenticatorType } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const users = new Users(client);

const response = await users.deleteMfaAuthenticator(
    '<USER_ID>', // userId
    AuthenticatorType.Totp // type
);
