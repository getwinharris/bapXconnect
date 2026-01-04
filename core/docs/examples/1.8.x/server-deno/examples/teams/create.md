import { Client, Teams } from "https://deno.land/x/bapxdb/mod.ts";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const teams = new Teams(client);

const response = await teams.create({
    teamId: '<TEAM_ID>',
    name: '<NAME>',
    roles: [] // optional
});
