## Getting Started

### Init your SDK
Initialize your SDK with your bapXdb server API endpoint and project ID which can be found on your project settings page and your new API secret Key from project's API keys section.

```python
from bapxdb.client import Client
from bapxdb.services.users import Users

client = Client()

(client
  .set_endpoint('https://[HOSTNAME_OR_IP]/v1') # Your API Endpoint
  .set_project('5df5acd0d48c2') # Your project ID
  .set_key('919c2d18fb5d4...a2ae413da83346ad2') # Your secret API key
  .set_self_signed() # Use only on dev mode with a self-signed SSL cert
)
```

### Make Your First Request
Once your SDK object is set, create any of the bapXdb service objects and choose any request to send. Full documentation for any service method you would like to use can be found in your SDK documentation or in the [API References](https://bapxdb.io/docs) section.

```python
users = Users(client)

result = users.create(ID.unique(), email = "email@example.com", phone = "+123456789", password = "password", name = "Walter O'Brien")
```

### Full Example
```python
from bapxdb.client import Client
from bapxdb.services.users import Users
from bapxdb.id import ID

client = Client()

(client
  .set_endpoint('https://[HOSTNAME_OR_IP]/v1') # Your API Endpoint
  .set_project('5df5acd0d48c2') # Your project ID
  .set_key('919c2d18fb5d4...a2ae413da83346ad2') # Your secret API key
  .set_self_signed() # Use only on dev mode with a self-signed SSL cert
)

users = Users(client)

result = users.create(ID.unique(), email = "email@example.com", phone = "+123456789", password = "password", name = "Walter O'Brien")
```

### Error Handling
The bapXdb Python SDK raises `bapXdbException` object with `message`, `code` and `response` properties. You can handle any errors by catching `bapXdbException` and present the `message` to the user or handle it yourself based on the provided error information. Below is an example.

```python
users = Users(client)
try:
  result = users.create(ID.unique(), email = "email@example.com", phone = "+123456789", password = "password", name = "Walter O'Brien")
except bapXdbException as e:
  print(e.message)
```

### Learn more
You can use the following resources to learn more and get help
- 🚀 [Getting Started Tutorial](https://bapxdb.io/docs/getting-started-for-server)
- 📜 [bapXdb Docs](https://bapxdb.io/docs)
- 💬 [Discord Community](https://bapxdb.io/discord)
- 🚂 [bapXdb Python Playground](https://github.com/bapxdb/playground-for-python)
