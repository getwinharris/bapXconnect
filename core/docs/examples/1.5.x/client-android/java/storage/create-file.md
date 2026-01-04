import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.models.InputFile;
import io.bapxdb.services.Storage;

Client client = new Client(context)
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

Storage storage = new Storage(client);

storage.createFile(
    "<BUCKET_ID>", // bucketId 
    "<FILE_ID>", // fileId 
    InputFile.fromPath("file.png"), // file 
    listOf("read("any")"), // permissions (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

