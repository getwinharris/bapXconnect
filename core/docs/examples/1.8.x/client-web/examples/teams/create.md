import { Client, Teams } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const teams = new Teams(client);

const result = await teams.create({
    teamId: '<TEAM_ID>',
    name: '<NAME>',
    roles: [] // optional
});

console.log(result);
