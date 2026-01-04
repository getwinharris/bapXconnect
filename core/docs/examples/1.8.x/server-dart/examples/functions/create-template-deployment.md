import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Functions functions = Functions(client);

Deployment result = await functions.createTemplateDeployment(
    functionId: '<FUNCTION_ID>',
    repository: '<REPOSITORY>',
    owner: '<OWNER>',
    rootDirectory: '<ROOT_DIRECTORY>',
    type: TemplateReferenceType.commit,
    reference: '<REFERENCE>',
    activate: false, // (optional)
);
