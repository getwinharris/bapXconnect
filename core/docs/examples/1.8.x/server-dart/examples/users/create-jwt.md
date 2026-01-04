import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Users users = Users(client);

Jwt result = await users.createJWT(
    userId: '<USER_ID>',
    sessionId: '<SESSION_ID>', // (optional)
    duration: 0, // (optional)
);
