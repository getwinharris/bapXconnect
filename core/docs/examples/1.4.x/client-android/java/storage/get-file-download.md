import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Storage;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2"); // Your project ID

Storage storage = new Storage(client);

storage.getFileDownload(
    "[BUCKET_ID]",
    "[FILE_ID]"
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);
