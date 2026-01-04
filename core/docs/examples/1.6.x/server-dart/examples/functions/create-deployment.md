import 'dart:io';
import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Functions functions = Functions(client);

Deployment result = await functions.createDeployment(
    functionId: '<FUNCTION_ID>',
    code: InputFile(path: './path-to-files/image.jpg', filename: 'image.jpg'),
    activate: false,
    entrypoint: '<ENTRYPOINT>', // (optional)
    commands: '<COMMANDS>', // (optional)
);
