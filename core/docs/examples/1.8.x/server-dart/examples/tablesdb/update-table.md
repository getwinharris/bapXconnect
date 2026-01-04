import 'package:dart_bapxdb/dart_bapxdb.dart';
import 'package:dart_bapxdb/permission.dart';
import 'package:dart_bapxdb/role.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

TablesDB tablesDB = TablesDB(client);

Table result = await tablesDB.updateTable(
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    name: '<NAME>',
    permissions: [Permission.read(Role.any())], // (optional)
    rowSecurity: false, // (optional)
    enabled: false, // (optional)
);
