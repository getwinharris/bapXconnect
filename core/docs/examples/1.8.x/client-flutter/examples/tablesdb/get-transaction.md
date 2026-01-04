import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

TablesDB tablesDB = TablesDB(client);

Transaction result = await tablesDB.getTransaction(
    transactionId: '<TRANSACTION_ID>',
);
