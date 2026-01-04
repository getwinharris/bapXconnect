import 'dart:io';
import 'package:bapxdb/bapxdb.dart';
import 'package:bapxdb/permission.dart';
import 'package:bapxdb/role.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

Storage storage = Storage(client);

File result = await storage.createFile(
    bucketId: '<BUCKET_ID>',
    fileId: '<FILE_ID>',
    file: InputFile(path: './path-to-files/image.jpg', filename: 'image.jpg'),
    permissions: [Permission.read(Role.any())], // optional
);
