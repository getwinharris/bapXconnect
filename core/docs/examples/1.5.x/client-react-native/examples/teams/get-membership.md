import { Client, Teams } from "react-native-bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const teams = new Teams(client);

const result = await teams.getMembership(
    '<TEAM_ID>', // teamId
    '<MEMBERSHIP_ID>' // membershipId
);

console.log(result);
