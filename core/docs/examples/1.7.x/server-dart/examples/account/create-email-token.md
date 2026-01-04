import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Account account = Account(client);

Token result = await account.createEmailToken(
    userId: '<USER_ID>',
    email: 'email@example.com',
    phrase: false, // (optional)
);
