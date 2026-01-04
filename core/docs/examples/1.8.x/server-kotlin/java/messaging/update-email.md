import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Messaging;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>") // Your project ID
    .setKey("<YOUR_API_KEY>"); // Your secret API key

Messaging messaging = new Messaging(client);

messaging.updateEmail(
    "<MESSAGE_ID>", // messageId
    List.of(), // topics (optional)
    List.of(), // users (optional)
    List.of(), // targets (optional)
    "<SUBJECT>", // subject (optional)
    "<CONTENT>", // content (optional)
    false, // draft (optional)
    false, // html (optional)
    List.of(), // cc (optional)
    List.of(), // bcc (optional)
    "", // scheduledAt (optional)
    List.of(), // attachments (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

