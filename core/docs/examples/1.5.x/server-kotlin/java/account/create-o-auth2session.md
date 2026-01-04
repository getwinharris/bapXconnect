import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Account;
import io.bapxdb.enums.OAuthProvider;

Client client = new Client()
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("5df5acd0d48c2"); // Your project ID

Account account = new Account(client);

account.createOAuth2Session(
    OAuthProvider.AMAZON, // provider
    "https://example.com", // success (optional)
    "https://example.com", // failure (optional)
    listOf(), // scopes (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        System.out.println(result);
    })
);

