require 'bapxdb'

include bapXdb

client = Client.new
    .set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID
    .set_key('<YOUR_API_KEY>') # Your secret API key

users = Users.new(client)

result = users.list_targets(
    user_id: '<USER_ID>',
    queries: [] # optional
)
