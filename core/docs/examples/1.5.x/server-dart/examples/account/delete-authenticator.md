import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
    .setSession(''); // The user session to authenticate with

Account account = Account(client);

await account.deleteAuthenticator(
    type: AuthenticatorType.totp,
    otp: '<OTP>',
);
