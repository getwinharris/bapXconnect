POST /v1/databases/{databaseId}/collections/{collectionId}/attributes/string HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "key": "",
  "size": 1,
  "required": false,
  "default": "<DEFAULT>",
  "array": false,
  "encrypt": false
}
