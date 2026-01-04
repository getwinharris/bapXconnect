import 'package:dart_bapxdb/dart_bapxdb.dart';
import 'package:dart_bapxdb/permission.dart';
import 'package:dart_bapxdb/role.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

Storage storage = Storage(client);

Bucket result = await storage.updateBucket(
    bucketId: '<BUCKET_ID>',
    name: '<NAME>',
    permissions: [Permission.read(Role.any())], // (optional)
    fileSecurity: false, // (optional)
    enabled: false, // (optional)
    maximumFileSize: 1, // (optional)
    allowedFileExtensions: [], // (optional)
    compression: Compression.none, // (optional)
    encryption: false, // (optional)
    antivirus: false, // (optional)
    transformations: false, // (optional)
);
