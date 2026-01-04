import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Locale;

Client client = new Client(context)
    .setEndpoint("https://cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

Locale locale = new Locale(client);

locale.listCountriesPhones(new CoroutineCallback<>((result, error) -> {
    if (error != null) {
        error.printStackTrace();
        return;
    }

    Log.d("bapXdb", result.toString());
}));
