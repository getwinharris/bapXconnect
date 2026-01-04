from bapxdb.client import Client
from bapxdb.services.graphql import Graphql

client = Client()
client.set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

graphql = Graphql(client)

result = graphql.query(
    query = {}
)
