import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Storage storage = Storage(client);

BucketList result = await storage.listBuckets(
    queries: [], // (optional)
    search: '<SEARCH>', // (optional)
);
