POST /v1/tablesdb/{databaseId}/tables/{tableId}/rows HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>

{
  "rowId": "<ROW_ID>",
  "data": {
    "username": "walter.obrien",
    "email": "walter.obrien@example.com",
    "fullName": "Walter O'Brien",
    "age": 30,
    "isAdmin": false
  },
  "permissions": ["read(\"any\")"],
  "transactionId": "<TRANSACTION_ID>"
}
