require 'bapxdb'

include bapXdb

client = Client.new
    .set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID
    .set_jwt('<YOUR_JWT>') # Your secret JSON Web Token

messaging = Messaging.new(client)

result = messaging.delete_subscriber(
    topic_id: '<TOPIC_ID>',
    subscriber_id: '<SUBSCRIBER_ID>'
)
