import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Users users = Users(client);

Target result = await users.createTarget(
    userId: '<USER_ID>',
    targetId: '<TARGET_ID>',
    providerType: MessagingProviderType.email,
    identifier: '<IDENTIFIER>',
    providerId: '<PROVIDER_ID>', // (optional)
    name: '<NAME>', // (optional)
);
