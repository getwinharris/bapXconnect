import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2'); // Your project ID

Account account = Account(client);

MfaType result = await account.addAuthenticator(
    type: AuthenticatorType.totp,
);
