import { Client, Account, OAuthProvider } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

const account = new Account(client);

account.createOAuth2Session(
    OAuthProvider.Amazon, // provider
    'https://example.com', // success (optional)
    'https://example.com', // failure (optional)
    [] // scopes (optional)
);

