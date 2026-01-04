from bapxdb.client import Client
from bapxdb.services.teams import Teams

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_session('') # The user session to authenticate with

teams = Teams(client)

result = teams.update_name(
    team_id = '<TEAM_ID>',
    name = '<NAME>'
)
