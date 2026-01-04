const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const messaging = new sdk.Messaging(client);

const result = await messaging.createTwilioProvider(
    '<PROVIDER_ID>', // providerId
    '<NAME>', // name
    '+12065550100', // from (optional)
    '<ACCOUNT_SID>', // accountSid (optional)
    '<AUTH_TOKEN>', // authToken (optional)
    false // enabled (optional)
);
