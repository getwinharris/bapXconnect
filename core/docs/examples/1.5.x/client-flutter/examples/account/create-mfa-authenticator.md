import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Account account = Account(client);

MfaType result = await account.createMfaAuthenticator(
    type: AuthenticatorType.totp,
);
