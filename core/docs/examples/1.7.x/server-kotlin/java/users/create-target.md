import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Users;
import io.bapxdb.enums.MessagingProviderType;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Users users = new Users(client);

users.createTarget(
    "<USER_ID>", // userId
    "<TARGET_ID>", // targetId
    MessagingProviderType.EMAIL, // providerType
    "<IDENTIFIER>", // identifier
    "<PROVIDER_ID>", // providerId (optional)
    "<NAME>", // name (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

