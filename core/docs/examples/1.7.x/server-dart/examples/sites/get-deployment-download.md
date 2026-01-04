import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Sites sites = Sites(client);

UInt8List result = await sites.getDeploymentDownload(
    siteId: '<SITE_ID>',
    deploymentId: '<DEPLOYMENT_ID>',
    type: DeploymentDownloadType.source, // (optional)
);
