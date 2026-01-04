import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setJWT('<YOUR_JWT>'); // Your secret JSON Web Token

Messaging messaging = Messaging(client);

await messaging.deleteSubscriber(
    topicId: '<TOPIC_ID>',
    subscriberId: '<SUBSCRIBER_ID>',
);
