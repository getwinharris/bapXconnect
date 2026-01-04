require 'bapxdb'

include bapXdb

client = Client.new
    .set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID
    .set_key('<YOUR_API_KEY>') # Your secret API key

messaging = Messaging.new(client)

result = messaging.list_topic_logs(
    topic_id: '<TOPIC_ID>',
    queries: [] # optional
)
