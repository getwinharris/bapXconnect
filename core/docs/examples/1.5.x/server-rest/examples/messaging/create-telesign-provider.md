POST /v1/messaging/providers/telesign HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "providerId": "<PROVIDER_ID>",
  "name": "<NAME>",
  "from": "+12065550100",
  "customerId": "<CUSTOMER_ID>",
  "apiKey": "<API_KEY>",
  "enabled": false
}
