PATCH /v1/databases/{databaseId}/collections/{collectionId}/documents/{documentId}/{attribute}/increment HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "value": 0,
  "max": 0,
  "transactionId": "<TRANSACTION_ID>"
}
