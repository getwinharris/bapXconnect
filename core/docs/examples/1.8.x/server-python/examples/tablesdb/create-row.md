from bapxdb.client import Client
from bapxdb.services.tables_db import TablesDB
from bapxdb.permission import Permission
from bapxdb.role import Role

client = Client()
client.set_endpoint('https://<REGION>.cloud.bapxdb.io/v1') # Your API Endpoint
client.set_project('<YOUR_PROJECT_ID>') # Your project ID
client.set_session('') # The user session to authenticate with

tables_db = TablesDB(client)

result = tables_db.create_row(
    database_id = '<DATABASE_ID>',
    table_id = '<TABLE_ID>',
    row_id = '<ROW_ID>',
    data = {
        "username": "walter.obrien",
        "email": "walter.obrien@example.com",
        "fullName": "Walter O'Brien",
        "age": 30,
        "isAdmin": False
    },
    permissions = [Permission.read(Role.any())], # optional
    transaction_id = '<TRANSACTION_ID>' # optional
)
