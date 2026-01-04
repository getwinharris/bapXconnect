import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Storage storage = Storage(client);

FileList result = await storage.listFiles(
    bucketId: '<BUCKET_ID>',
    queries: [], // optional
    search: '<SEARCH>', // optional
);
