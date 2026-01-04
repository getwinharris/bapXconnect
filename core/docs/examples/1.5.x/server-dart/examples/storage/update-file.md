import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Storage storage = Storage(client);

File result = await storage.updateFile(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    name: '<NAME>', // (optional)
    permissions: ["read("any")"], // (optional)
);
