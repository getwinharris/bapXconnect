import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Functions functions = Functions(client);

 result = await functions.createBuild(
    functionId: '<FUNCTION_ID>',
    deploymentId: '<DEPLOYMENT_ID>',
    buildId: '<BUILD_ID>', // (optional)
);
