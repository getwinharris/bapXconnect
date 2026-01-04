PUT /v1/databases/{databaseId}/collections/{collectionId} HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "name": "<NAME>",
  "permissions": ["read(\"any\")"],
  "documentSecurity": false,
  "enabled": false
}
