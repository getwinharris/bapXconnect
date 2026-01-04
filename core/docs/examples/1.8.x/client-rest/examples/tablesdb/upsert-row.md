PUT /v1/tablesdb/{databaseId}/tables/{tableId}/rows/{rowId} HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>

{
  "data": {
    "username": "walter.obrien",
    "email": "walter.obrien@example.com",
    "fullName": "Walter O'Brien",
    "age": 33,
    "isAdmin": false
  },
  "permissions": ["read(\"any\")"],
  "transactionId": "<TRANSACTION_ID>"
}
