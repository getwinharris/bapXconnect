import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

Storage storage = Storage(client);

Uint8List result = await storage.getFilePreview(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    width: 0, // (optional)
    height: 0, // (optional)
    gravity: ImageGravity.center, // (optional)
    quality: -1, // (optional)
    borderWidth: 0, // (optional)
    borderColor: '', // (optional)
    borderRadius: 0, // (optional)
    opacity: 0, // (optional)
    rotation: -360, // (optional)
    background: '', // (optional)
    output: ImageFormat.jpg, // (optional)
    token: '<TOKEN>', // (optional)
);
