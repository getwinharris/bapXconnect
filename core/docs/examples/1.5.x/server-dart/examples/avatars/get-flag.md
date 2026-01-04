import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Avatars avatars = Avatars(client);

UInt8List result = await avatars.getFlag(
    code: Flag.afghanistan,
    width: 0, // (optional)
    height: 0, // (optional)
    quality: 0, // (optional)
);
