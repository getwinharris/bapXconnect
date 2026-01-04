import 'package:bapxdb/bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Teams teams = Teams(client);

TeamList result = await teams.list(
    queries: [], // optional
    search: '<SEARCH>', // optional
);
