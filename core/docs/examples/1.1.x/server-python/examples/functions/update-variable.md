from bapxdb.client import Client
from bapxdb.services.functions import Functions

client = Client()

(client
  .set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
  .set_project('5df5acd0d48c2') # Your project ID
  .set_key('919c2d18fb5d4...a2ae413da83346ad2') # Your secret API key
)

functions = Functions(client)

result = functions.update_variable('[FUNCTION_ID]', '[VARIABLE_ID]', '[KEY]')
