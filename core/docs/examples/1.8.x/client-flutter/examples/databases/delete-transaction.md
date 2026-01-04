import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Databases databases = Databases(client);

await databases.deleteTransaction(
    transactionId: '<TRANSACTION_ID>',
);
