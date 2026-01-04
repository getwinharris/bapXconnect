import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Databases;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

Databases databases = new Databases(client);

databases.incrementDocumentAttribute(
    "<DATABASE_ID>", // databaseId 
    "<COLLECTION_ID>", // collectionId 
    "<DOCUMENT_ID>", // documentId 
    "", // attribute 
    0, // value (optional)
    0, // max (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

