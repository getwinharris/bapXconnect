POST /v1/storage/buckets/{bucketId}/files HTTP/1.1
Host: cloud.bapxdb.io
Content-Type: multipart/form-data; boundary="cec8e8123c05ba25"
X-bapXdb-Response-Format: 1.8.0
X-bapXdb-Project: <YOUR_PROJECT_ID>
X-bapXdb-Session: 
X-bapXdb-JWT: <YOUR_JWT>
Content-Length: *Length of your entity body in bytes*

--cec8e8123c05ba25
Content-Disposition: form-data; name="operations"

{ "query": "mutation { storageCreateFile(bucketId: $bucketId, fileId: $fileId, file: $file, permissions: $permissions) { id }" }, "variables": { "bucketId": "<BUCKET_ID>", "fileId": "<FILE_ID>", "file": null, "permissions": ["read("any")"] } }

--cec8e8123c05ba25
Content-Disposition: form-data; name="map"

{ "0": ["variables.file"],  }

--cec8e8123c05ba25
Content-Disposition: form-data; name="0"; filename="file.ext"

File contents

--cec8e8123c05ba25--
