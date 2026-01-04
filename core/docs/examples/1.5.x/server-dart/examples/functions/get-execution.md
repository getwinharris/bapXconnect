import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Functions functions = Functions(client);

Execution result = await functions.getExecution(
    functionId: '<FUNCTION_ID>',
    executionId: '<EXECUTION_ID>',
);
