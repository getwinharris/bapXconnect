import { Client, Teams } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const teams = new Teams(client);

const result = await teams.listMemberships(
    '<TEAM_ID>', // teamId
    [], // queries (optional)
    '<SEARCH>' // search (optional)
);

console.log(result);
