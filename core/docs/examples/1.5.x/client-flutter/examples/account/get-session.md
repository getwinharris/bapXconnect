import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Account account = Account(client);

Session result = await account.getSession(
    sessionId: '<SESSION_ID>',
);
