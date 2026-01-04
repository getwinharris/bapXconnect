import { Client, Teams } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const teams = new Teams(client);

const result = await teams.getMembership(
    '<TEAM_ID>', // teamId
    '<MEMBERSHIP_ID>' // membershipId
);

console.log(result);
