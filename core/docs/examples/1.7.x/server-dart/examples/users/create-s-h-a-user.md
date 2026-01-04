import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Users users = Users(client);

User result = await users.createSHAUser(
    userId: '<USER_ID>',
    email: 'email@example.com',
    password: 'password',
    passwordVersion: PasswordHash.sha1, // (optional)
    name: '<NAME>', // (optional)
);
