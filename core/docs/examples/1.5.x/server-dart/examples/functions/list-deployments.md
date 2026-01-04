import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Functions functions = Functions(client);

DeploymentList result = await functions.listDeployments(
    functionId: '<FUNCTION_ID>',
    queries: [], // (optional)
    search: '<SEARCH>', // (optional)
);
