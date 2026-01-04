require 'bapxdb'

include bapXdb

client = Client.new
    .set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
    .set_project('<YOUR_PROJECT_ID>') # Your project ID
    .set_key('<YOUR_API_KEY>') # Your secret API key

graphql = Graphql.new(client)

result = graphql.query(
    query: {}
)
