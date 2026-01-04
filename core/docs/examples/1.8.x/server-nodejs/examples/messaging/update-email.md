const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const messaging = new sdk.Messaging(client);

const result = await messaging.updateEmail({
    messageId: '<MESSAGE_ID>',
    topics: [], // optional
    users: [], // optional
    targets: [], // optional
    subject: '<SUBJECT>', // optional
    content: '<CONTENT>', // optional
    draft: false, // optional
    html: false, // optional
    cc: [], // optional
    bcc: [], // optional
    scheduledAt: '', // optional
    attachments: [] // optional
});
