import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Avatars avatars = Avatars(client);

UInt8List result = await avatars.getQR(
    text: '<TEXT>',
    size: 1, // (optional)
    margin: 0, // (optional)
    download: false, // (optional)
);
