PUT /v1/storage/buckets/{bucketId} HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: application/json
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Key: <YOUR_API_KEY>

{
  "name": "<NAME>",
  "permissions": ["read(\"any\")"],
  "fileSecurity": false,
  "enabled": false,
  "maximumFileSize": 1,
  "allowedFileExtensions": [],
  "compression": "none",
  "encryption": false,
  "antivirus": false,
  "transformations": false
}
