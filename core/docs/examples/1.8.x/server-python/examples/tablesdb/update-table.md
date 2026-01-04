from bapxdb.client import Client
from bapxdb.services.tables_db import TablesDB
from bapxdb.permission import Permission
from bapxdb.role import Role

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_key('<YOUR_API_KEY>') # Your secret API key

tables_db = TablesDB(client)

result = tables_db.update_table(
    database_id = '<DATABASE_ID>',
    table_id = '<TABLE_ID>',
    name = '<NAME>',
    permissions = [Permission.read(Role.any())], # optional
    row_security = False, # optional
    enabled = False # optional
)
