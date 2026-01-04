import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Messaging messaging = Messaging(client);

Provider result = await messaging.createTelesignProvider(
    providerId: '<PROVIDER_ID>',
    name: '<NAME>',
    from: '+12065550100', // (optional)
    customerId: '<CUSTOMER_ID>', // (optional)
    apiKey: '<API_KEY>', // (optional)
    enabled: false, // (optional)
);
