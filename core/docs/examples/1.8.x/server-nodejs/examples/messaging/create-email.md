const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const messaging = new sdk.Messaging(client);

const result = await messaging.createEmail({
    messageId: '<MESSAGE_ID>',
    subject: '<SUBJECT>',
    content: '<CONTENT>',
    topics: [], // optional
    users: [], // optional
    targets: [], // optional
    cc: [], // optional
    bcc: [], // optional
    attachments: [], // optional
    draft: false, // optional
    html: false, // optional
    scheduledAt: '' // optional
});
