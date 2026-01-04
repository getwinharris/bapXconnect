import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Storage storage = Storage(client);

await storage.deleteFile(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
);
