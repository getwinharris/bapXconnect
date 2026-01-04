using bapXdb;
using bapXdb.Enums;
using bapXdb.Models;
using bapXdb.Services;

Client client = new Client()
    .SetEndPoint("https://<REGION>.cloud.bapxdb.io/v1") // Your API Endpoint
    .SetProject("<YOUR_PROJECT_ID>") // Your project ID
    .SetKey("<YOUR_API_KEY>"); // Your secret API key

TablesDB tablesDB = new TablesDB(client);

ColumnRelationship result = await tablesDB.CreateRelationshipColumn(
    databaseId: "<DATABASE_ID>",
    tableId: "<TABLE_ID>",
    relatedTableId: "<RELATED_TABLE_ID>",
    type: RelationshipType.OneToOne,
    twoWay: false, // optional
    key: "", // optional
    twoWayKey: "", // optional
    onDelete: RelationMutate.Cascade // optional
);