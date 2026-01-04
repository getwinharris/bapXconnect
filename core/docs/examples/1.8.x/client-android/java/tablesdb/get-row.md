import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.TablesDB;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

TablesDB tablesDB = new TablesDB(client);

tablesDB.getRow(
    "<DATABASE_ID>", // databaseId 
    "<TABLE_ID>", // tableId 
    "<ROW_ID>", // rowId 
    List.of(), // queries (optional)
    "<TRANSACTION_ID>", // transactionId (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

