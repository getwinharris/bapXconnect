import { Client, Teams } from "react-native-bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const teams = new Teams(client);

const result = await teams.getPrefs({
    teamId: '<TEAM_ID>'
});

console.log(result);
