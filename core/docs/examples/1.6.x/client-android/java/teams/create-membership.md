import io.bapxdb.Client;
import io.bapxdb.coroutines.CoroutineCallback;
import io.bapxdb.services.Teams;

Client client = new Client(context)
    .setEndpoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .setProject("<YOUR_PROJECT_ID>"); // Your project ID

Teams teams = new Teams(client);

teams.createMembership(
    "<TEAM_ID>", // teamId 
    listOf(), // roles 
    "email@example.com", // email (optional)
    "<USER_ID>", // userId (optional)
    "+12065550100", // phone (optional)
    "https://example.com", // url (optional)
    "<NAME>", // name (optional)
    new CoroutineCallback<>((result, error) -> {
        if (error != null) {
            error.printStackTrace();
            return;
        }

        Log.d("bapXdb", result.toString());
    })
);

