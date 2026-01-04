import 'package:bapxdb/bapxdb.dart';
import 'package:bapxdb/permission.dart';
import 'package:bapxdb/role.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

TablesDB tablesDB = TablesDB(client);

Row result = await tablesDB.createRow(
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    rowId: '<ROW_ID>',
    data: {
        "username": "walter.obrien",
        "email": "walter.obrien@example.com",
        "fullName": "Walter O'Brien",
        "age": 30,
        "isAdmin": false
    },
    permissions: [Permission.read(Role.any())], // optional
    transactionId: '<TRANSACTION_ID>', // optional
);
