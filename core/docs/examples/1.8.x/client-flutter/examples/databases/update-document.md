import 'package:bapxdb/bapxdb.dart';
import 'package:bapxdb/permission.dart';
import 'package:bapxdb/role.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Databases databases = Databases(client);

Document result = await databases.updateDocument(
    databaseId: '<DATABASE_ID>',
    collectionId: '<COLLECTION_ID>',
    documentId: '<DOCUMENT_ID>',
    data: {
        "username": "walter.obrien",
        "email": "walter.obrien@example.com",
        "fullName": "Walter O'Brien",
        "age": 33,
        "isAdmin": false
    }, // optional
    permissions: [Permission.read(Role.any())], // optional
    transactionId: '<TRANSACTION_ID>', // optional
);
