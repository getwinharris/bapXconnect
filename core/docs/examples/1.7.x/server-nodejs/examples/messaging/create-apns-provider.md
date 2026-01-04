const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const messaging = new sdk.Messaging(client);

const result = await messaging.createApnsProvider(
    '<PROVIDER_ID>', // providerId
    '<NAME>', // name
    '<AUTH_KEY>', // authKey (optional)
    '<AUTH_KEY_ID>', // authKeyId (optional)
    '<TEAM_ID>', // teamId (optional)
    '<BUNDLE_ID>', // bundleId (optional)
    false, // sandbox (optional)
    false // enabled (optional)
);
