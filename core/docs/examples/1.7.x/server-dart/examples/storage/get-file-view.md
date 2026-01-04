import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Storage storage = Storage(client);

UInt8List result = await storage.getFileView(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    token: '<TOKEN>', // (optional)
);
