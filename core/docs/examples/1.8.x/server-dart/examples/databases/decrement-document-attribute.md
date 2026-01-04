import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Databases databases = Databases(client);

Document result = await databases.decrementDocumentAttribute(
    databaseId: '<DATABASE_ID>',
    collectionId: '<COLLECTION_ID>',
    documentId: '<DOCUMENT_ID>',
    attribute: '',
    value: 0, // (optional)
    min: 0, // (optional)
    transactionId: '<TRANSACTION_ID>', // (optional)
);
