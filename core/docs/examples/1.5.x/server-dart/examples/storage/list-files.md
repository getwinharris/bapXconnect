import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Storage storage = Storage(client);

FileList result = await storage.listFiles(
    bucketId: '<BUCKET_ID>',
    queries: [], // (optional)
    search: '<SEARCH>', // (optional)
);
