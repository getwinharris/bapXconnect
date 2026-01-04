import { Client, Teams } from "bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const teams = new Teams(client);

const result = await teams.getPrefs(
    '<TEAM_ID>' // teamId
);

console.log(result);
