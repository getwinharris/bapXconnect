from bapxdb.client import Client
from bapxdb.services.users import Users

client = Client()
client.set_endpoint('https://cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

users = Users(client)

result = users.list_memberships(
    user_id = '<USER_ID>'
)
