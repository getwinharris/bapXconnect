POST /v1/tablesdb/{databaseId}/tables/{tableId}/columns/relationship HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "relatedTableId": "<RELATED_TABLE_ID>",
  "type": "oneToOne",
  "twoWay": false,
  "key": "",
  "twoWayKey": "",
  "onDelete": "cascade"
}
