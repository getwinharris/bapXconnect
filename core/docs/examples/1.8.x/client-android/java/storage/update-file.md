import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.Permission;
import io.bapxdb.Role;
import io.bapxdb.services.Storage;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

Storage storage = new Storage(client);

storage.updateFile(
    "<BUCKET_ID>", // bucketId 
    "<FILE_ID>", // fileId 
    "<NAME>", // name (optional)
    List.of(Permission.read(Role.any())), // permissions (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

