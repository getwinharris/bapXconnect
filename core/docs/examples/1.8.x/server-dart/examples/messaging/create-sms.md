import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Messaging messaging = Messaging(client);

Message result = await messaging.createSMS(
    messageId: '<MESSAGE_ID>',
    content: '<CONTENT>',
    topics: [], // (optional)
    users: [], // (optional)
    targets: [], // (optional)
    draft: false, // (optional)
    scheduledAt: '', // (optional)
);
