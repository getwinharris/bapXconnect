import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Databases;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setKey(""); // 

Databases databases = new Databases(client);

databases.createDocuments(
    "<DATABASE_ID>", // databaseId 
    "<COLLECTION_ID>", // collectionId 
    listOf(), // documents 
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

