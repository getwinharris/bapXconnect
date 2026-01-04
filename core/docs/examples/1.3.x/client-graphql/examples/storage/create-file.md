POST /v1/storage/buckets/{bucketId}/files HTTP/1.1
Host: HOSTNAME
Content-Type: multipart/form-data; boundary="cec8e8123c05ba25"
X-bapXdb-Response-Format: 1.0.0
X-bapXdb-Project: 5df5acd0d48c2
X-bapXdb-JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...
Content-Length: *Length of your entity body in bytes*

--cec8e8123c05ba25
Content-Disposition: form-data; name="operations"

{ "query": "mutation { storageCreateFile(bucketId: $bucketId, fileId: $fileId, file: $file) { id }" }, "variables": { "bucketId": "[BUCKET_ID]", "fileId": "[FILE_ID]", "file": null } }

--cec8e8123c05ba25
Content-Disposition: form-data; name="map"

{ "0": ["variables.file"] }

--cec8e8123c05ba25
Content-Disposition: form-data; name="0"; filename="file.ext"

File contents

--cec8e8123c05ba25--
