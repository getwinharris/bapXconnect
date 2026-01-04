import { Client, Avatars } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const avatars = new Avatars(client);

const result = avatars.getInitials({
    name: '<NAME>', // optional
    width: 0, // optional
    height: 0, // optional
    background: '' // optional
});
