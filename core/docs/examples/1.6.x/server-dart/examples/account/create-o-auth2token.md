import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Account account = Account(client);

await account.createOAuth2Token(
    provider: OAuthProvider.amazon,
    success: 'https://example.com', // (optional)
    failure: 'https://example.com', // (optional)
    scopes: [], // (optional)
);
