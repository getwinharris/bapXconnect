import 'package:dart_bapxdb/dart_bapxdb.dart';
import 'package:dart_bapxdb/permission.dart';
import 'package:dart_bapxdb/role.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Databases databases = Databases(client);

Document result = await databases.upsertDocument(
    databaseId: '<DATABASE_ID>',
    collectionId: '<COLLECTION_ID>',
    documentId: '<DOCUMENT_ID>',
    data: {
        "username": "walter.obrien",
        "email": "walter.obrien@example.com",
        "fullName": "Walter O'Brien",
        "age": 30,
        "isAdmin": false
    }, // (optional)
    permissions: [Permission.read(Role.any())], // (optional)
    transactionId: '<TRANSACTION_ID>', // (optional)
);
