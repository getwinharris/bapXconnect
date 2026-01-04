PATCH /v1/databases/{databaseId}/collections/{collectionId}/documents HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "data": {
    "username": "walter.obrien",
    "email": "walter.obrien@example.com",
    "fullName": "Walter O'Brien",
    "age": 33,
    "isAdmin": false
  },
  "queries": [],
  "transactionId": "<TRANSACTION_ID>"
}
