import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.models.InputFile;
import io.bapxdb.Permission;
import io.bapxdb.Role;
import io.bapxdb.services.Storage;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setSession(""); // The user session to authenticate with

Storage storage = new Storage(client);

storage.createFile(
    "<BUCKET_ID>", // bucketId
    "<FILE_ID>", // fileId
    InputFile.fromPath("file.png"), // file
    List.of(Permission.read(Role.any())), // permissions (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

