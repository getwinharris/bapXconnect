import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Account;
import io.bapxdb.enums.AuthenticatorType;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

Account account = new Account(client);

account.createMFAAuthenticator(
    AuthenticatorType.TOTP, // type 
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

