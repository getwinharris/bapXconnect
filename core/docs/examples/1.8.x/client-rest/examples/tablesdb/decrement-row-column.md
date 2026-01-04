PATCH /v1/tablesdb/{databaseId}/tables/{tableId}/rows/{rowId}/{column}/decrement HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>

{
  "value": 0,
  "min": 0,
  "transactionId": "<TRANSACTION_ID>"
}
