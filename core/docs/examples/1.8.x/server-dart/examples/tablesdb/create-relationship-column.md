import 'package:dart_bapxdb/dart_bapxdb.dart';

Client client = Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

TablesDB tablesDB = TablesDB(client);

ColumnRelationship result = await tablesDB.createRelationshipColumn(
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    relatedTableId: '<RELATED_TABLE_ID>',
    type: RelationshipType.oneToOne,
    twoWay: false, // (optional)
    key: '', // (optional)
    twoWayKey: '', // (optional)
    onDelete: RelationMutate.cascade, // (optional)
);
