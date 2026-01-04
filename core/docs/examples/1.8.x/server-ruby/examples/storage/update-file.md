require 'bapxdb'

include bapXdb
include bapXdb::Permission
include bapXdb::Role

client = Client.new
    .set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID
    .set_session('') # The user session to authenticate with

storage = Storage.new(client)

result = storage.update_file(
    bucket_id: '<BUCKET_ID>',
    file_id: '<FILE_ID>',
    name: '<NAME>', # optional
    permissions: [Permission.read(Role.any())] # optional
)
