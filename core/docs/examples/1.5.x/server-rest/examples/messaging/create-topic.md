POST /v1/messaging/topics HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "topicId": "<TOPIC_ID>",
  "name": "<NAME>",
  "subscribe": ["any"]
}
