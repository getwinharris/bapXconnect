from bapxdb.client import Client
from bapxdb.services.functions import Functions

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

functions = Functions(client)

result = functions.list_variables(
    function_id = '<FUNCTION_ID>'
)
