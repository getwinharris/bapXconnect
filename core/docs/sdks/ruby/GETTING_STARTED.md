## Getting Started

### Init your SDK
Initialize your SDK with your bapXdb server API endpoint and project ID which can be found in your project settings page and your new API secret Key from project's API keys section.

```ruby
require 'bapxdb'

client = bapXdb::Client.new()

client
    .set_endpoint(ENV["APPWRITE_ENDPOINT"]) # Your API Endpoint
    .set_project(ENV["APPWRITE_PROJECT"]) # Your project ID
    .set_key(ENV["APPWRITE_SECRET"]) # Your secret API key
    .setSelfSigned() # Use only on dev mode with a self-signed SSL cert
;
```

### Make Your First Request
Once your SDK object is set, create any of the bapXdb service objects and choose any request to send. Full documentation for any service method you would like to use can be found in your SDK documentation or in the [API References](https://bapxdb.io/docs) section.

```ruby
users = bapXdb::Users.new(client);

user = users.create(userId: bapXdb::ID::unique(), email: "email@example.com", phone: "+123456789", password: "password", name: "Walter O'Brien");
```

### Full Example
```ruby
require 'bapxdb'

client = bapXdb::Client.new()

client
    .set_endpoint(ENV["APPWRITE_ENDPOINT"]) # Your API Endpoint
    .set_project(ENV["APPWRITE_PROJECT"]) # Your project ID
    .set_key(ENV["APPWRITE_SECRET"]) # Your secret API key
    .setSelfSigned() # Use only on dev mode with a self-signed SSL cert
;

users = bapXdb::Users.new(client);

user = users.create(userId: bapXdb::ID::unique(), email: "email@example.com", phone: "+123456789", password: "password", name: "Walter O'Brien");
```

### Error Handling
The bapXdb Ruby SDK raises `bapXdb::Exception` object with `message`, `code` and `response` properties. You can handle any errors by catching `bapXdb::Exception` and present the `message` to the user or handle it yourself based on the provided error information. Below is an example.

```ruby
users = bapXdb::Users.new(client);

begin
    user = users.create(userId: bapXdb::ID::unique(), email: "email@example.com", phone: "+123456789", password: "password", name: "Walter O'Brien");
rescue bapXdb::Exception => error
    puts error.message
end
```

### Learn more
You can use the following resources to learn more and get help
- 🚀 [Getting Started Tutorial](https://bapxdb.io/docs/getting-started-for-server)
- 📜 [bapXdb Docs](https://bapxdb.io/docs)
- 💬 [Discord Community](https://bapxdb.io/discord)
- 🚂 [bapXdb Ruby Playground](https://github.com/bapxdb/playground-for-ruby)
