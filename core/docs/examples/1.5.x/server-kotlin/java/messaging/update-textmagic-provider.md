import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Messaging;

Client client = new Client()
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Messaging messaging = new Messaging(client);

messaging.updateTextmagicProvider(
    "<PROVIDER_ID>", // providerId
    "<NAME>", // name (optional)
    false, // enabled (optional)
    "<USERNAME>", // username (optional)
    "<API_KEY>", // apiKey (optional)
    "<FROM>", // from (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

