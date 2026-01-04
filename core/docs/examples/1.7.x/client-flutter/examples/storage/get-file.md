import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Storage storage = Storage(client);

File result = await storage.getFile(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
);
