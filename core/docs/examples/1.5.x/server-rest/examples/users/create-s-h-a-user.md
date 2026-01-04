POST /v1/users/sha HTTP/1.1
Host: &lt;REGION&gt;.cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.6.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "userId": "<USER_ID>",
  "email": "email@example.com",
  "password": "password",
  "passwordVersion": "sha1",
  "name": "<NAME>"
}
