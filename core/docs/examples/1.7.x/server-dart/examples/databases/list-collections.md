import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Databases databases = Databases(client);

CollectionList result = await databases.listCollections(
    databaseId: '<DATABASE_ID>',
    queries: [], // (optional)
    search: '<SEARCH>', // (optional)
);
