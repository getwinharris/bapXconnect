import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.Permission;
import io.bapxdb.Role;
import io.bapxdb.services.TablesDB;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

TablesDB tablesDB = new TablesDB(client);

tablesDB.updateRow(
    "<DATABASE_ID>", // databaseId 
    "<TABLE_ID>", // tableId 
    "<ROW_ID>", // rowId 
    Map.of(
        "username", "walter.obrien",
        "email", "walter.obrien@example.com",
        "fullName", "Walter O'Brien",
        "age", 33,
        "isAdmin", false
    ), // data (optional)
    List.of(Permission.read(Role.any())), // permissions (optional)
    "<TRANSACTION_ID>", // transactionId (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

