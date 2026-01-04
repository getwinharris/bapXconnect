import { Client, Account } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePrefs({
    prefs: {
        "language": "en",
        "timezone": "UTC",
        "darkTheme": true
    }
});

console.log(result);
