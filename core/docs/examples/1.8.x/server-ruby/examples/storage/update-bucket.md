require 'bapxdb'

include bapXdb
include bapXdb::Enums
include bapXdb::Permission
include bapXdb::Role

client = Client.new
    .set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID
    .set_key('<YOUR_API_KEY>') # Your secret API key

storage = Storage.new(client)

result = storage.update_bucket(
    bucket_id: '<BUCKET_ID>',
    name: '<NAME>',
    permissions: [Permission.read(Role.any())], # optional
    file_security: false, # optional
    enabled: false, # optional
    maximum_file_size: 1, # optional
    allowed_file_extensions: [], # optional
    compression: Compression::NONE, # optional
    encryption: false, # optional
    antivirus: false, # optional
    transformations: false # optional
)
