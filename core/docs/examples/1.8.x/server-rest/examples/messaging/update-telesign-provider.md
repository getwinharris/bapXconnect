PATCH /v1/messaging/providers/telesign/{providerId} HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "name": "<NAME>",
  "enabled": false,
  "customerId": "<CUSTOMER_ID>",
  "apiKey": "<API_KEY>",
  "from": "<FROM>"
}
