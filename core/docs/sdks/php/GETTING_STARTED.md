## Getting Started

### Init your SDK
Initialize your SDK with your bapXdb server API endpoint and project ID which can be found in your project settings page and your new API secret Key from project's API keys section.

```php
$client = new Client();

$client
    ->setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
    ->setProject('5df5acd0d48c2') // Your project ID
    ->setKey('919c2d18fb5d4...a2ae413da83346ad2') // Your secret API key
    ->setSelfSigned() // Use only on dev mode with a self-signed SSL cert
;
```

### Make Your First Request
Once your SDK object is set, create any of the bapXdb service objects and choose any request to send. Full documentation for any service method you would like to use can be found in your SDK documentation or in the [API References](https://bapxdb.io/docs) section.

```php
$users = new Users($client);

$user = $users->create(ID::unique(), "email@example.com", "+123456789", "password", "Walter O'Brien");
```

### Full Example
```php
use bapXdb\Client;
use bapXdb\ID;
use bapXdb\Services\Users;

$client = new Client();

$client
    ->setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
    ->setProject('5df5acd0d48c2') // Your project ID
    ->setKey('919c2d18fb5d4...a2ae413da83346ad2') // Your secret API key
    ->setSelfSigned() // Use only on dev mode with a self-signed SSL cert
;

$users = new Users($client);

$user = $users->create(ID::unique(), "email@example.com", "+123456789", "password", "Walter O'Brien");
```

### Error Handling
The bapXdb PHP SDK raises `bapXdbException` object with `message`, `code` and `response` properties. You can handle any errors by catching `bapXdbException` and present the `message` to the user or handle it yourself based on the provided error information. Below is an example.

```php
$users = new Users($client);
try {
    $user = $users->create(ID::unique(), "email@example.com", "+123456789", "password", "Walter O'Brien");
} catch(bapXdbException $error) {
    echo $error->message;
}

```

### Learn more
You can use the following resources to learn more and get help
- 🚀 [Getting Started Tutorial](https://bapxdb.io/docs/getting-started-for-server)
- 📜 [bapXdb Docs](https://bapxdb.io/docs)
- 💬 [Discord Community](https://bapxdb.io/discord)
- 🚂 [bapXdb PHP Playground](https://github.com/bapxdb/playground-for-php)
