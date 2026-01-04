## Getting Started

### Add your Apple Platform
To initialize your SDK and start interacting with bapXdb services, you need to add a new Apple platform to your project. To add a new platform, go to your bapXdb console, select your project (create one if you haven't already), and click the 'Add Platform' button on the project Dashboard.

From the options, choose to add a new **iOS**, **macOS**, **watchOS** or **tvOS** platform and add your app credentials.

Add your app <u>name</u> and <u>bundle identifier</u>. Your bundle identifier can be found in your Xcode project file or your `Info.plist` file. By registering a new platform, you are allowing your app to communicate with the bapXdb API.

### Registering URL schemes

In order to capture the bapXdb OAuth callback url, the following URL scheme needs to be added to project. You can add this from Xcode by selecting your project file, then the target you wish to use OAuth with. From the `Info` tab, expand the `URL types` section and add your bapXdb instance domain for the `Identifier`, and `bapxdb-callback-[PROJECT-ID]` for the `URL scheme`. Be sure to replace the **[PROJECT_ID]** string with your actual bapXdb project ID. You can find your bapXdb project ID in your project settings screen in the console. Alternatively, you can add the following block directly to your targets `Info.plist` file:

```xml
<key>CFBundleURLTypes</key>
<array>
<dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>io.bapxdb</string>
    <key>CFBundleURLSchemes</key>
    <array>
        <string>bapxdb-callback-[PROJECT-ID]</string>
    </array>
</dict>
</array>
```

Next we need to add a hook to save cookies when our app is opened by its callback URL.

### Registering an OAuth handler view

> If you're using UIKit, you can skip this section.

In SwiftUI this is as simple as ensuring `.registerOAuthHandler()` is called on the `View` you want to invoke an OAuth request from.

### Updating the SceneDelegate for UIKit

> If you're using SwiftUI, you can skip this section.

For UIKit, you need to add the following function to your `SceneDelegate.swift`. If you have already defined this function, you can just add the contents from below.

```swift
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        guard let url = URLContexts.first?.url,
            url.absoluteString.contains("bapxdb-callback") else {
            return
        }
        WebAuthComponent.handleIncomingCookie(from: url)
    }
```

### Init your SDK

Initialize your SDK with your bapXdb server API endpoint and project ID which can be found in your project settings page.

```swift
import bapXdb

func main() {
    let client = Client()
        .setEndpoint("http://[HOSTNAME_OR_IP]/v1") // Your API Endpoint
        .setProject("5df5acd0d48c2") // Your project ID
        .setSelfSigned() // Use only on dev mode with a self-signed SSL cert
}
```

### Make Your First Request

Once your SDK object is initialized, create any of the bapXdb service objects and choose any request to send. Full documentation for any service method you would like to use can be found in your SDK documentation or in the [API References](https://bapxdb.io/docs) section.

```swift
let account = Account(client)

do {
    let user = try await account.create(
        userId: ID.unique(),
        email: "email@example.com",
        password: "password",
        name: "Walter O'Brien"
    )
    print(String(describing: user.toMap()))
} catch {
    print(error.localizedDescription)
}
```

### Full Example

```swift
import bapXdb

func main() {
    let client = Client()
        .setEndpoint("https://[HOSTNAME_OR_IP]/v1") // Your API Endpoint
        .setProject("5df5acd0d48c2") // Your project ID
        .setSelfSigned() // Use only on dev mode with a self-signed SSL cert

    let account = Account(client)
    
    do {
        let user = try await account.create(
            userId: ID.unique(),
            email: "email@example.com",
            password: "password",
            name: "Walter O'Brien"
        )
        print(String(describing: account.toMap()))
    } catch {
        print(error.localizedDescription)
    }
}
```

### Type Safety with Models

The bapXdb Apple SDK provides type safety when working with database documents through generic methods. Methods like `listDocuments`, `getDocument`, and others accept a `nestedType` parameter that allows you to specify your custom model type for full type safety.

```swift
struct Book: Codable {
    let name: String
    let author: String
    let releaseYear: String?
    let category: String?
    let genre: [String]?
    let isCheckedOut: Bool
}

let databases = Databases(client)

do {
    let documents = try await databases.listDocuments(
        databaseId: "your-database-id",
        collectionId: "your-collection-id",
        nestedType: Book.self // Pass in your custom model type
    )
    
    for book in documents.documents {
        print("Book: \(book.name) by \(book.author)") // Now you have full type safety
    }
} catch {
    print(error.localizedDescription)
}
```

**Tip**: You can use the `bapxdb types` command to automatically generate model definitions based on your bapXdb database schema. Learn more about [type generation](https://bapxdb.io/docs/products/databases/type-generation).

### Working with Model Methods

All bapXdb models come with built-in methods for data conversion and manipulation:

**`toMap()`** - Converts a model instance to a dictionary format, useful for debugging or manual data manipulation:
```swift
let user = try await account.get()
let userMap = user.toMap()
print(userMap) // Prints all user properties as a dictionary
```

**`from(map:)`** - Creates a model instance from a dictionary, useful when working with raw data:
```swift
let userData: [String: Any] = ["$id": "123", "name": "John", "email": "john@example.com"]
let user = User.from(map: userData)
```

**`encode(to:)`** - Encodes the model to JSON format (part of Swift's Codable protocol), useful for serialization:
```swift
let user = try await account.get()
let jsonData = try JSONEncoder().encode(user)
let jsonString = String(data: jsonData, encoding: .utf8)
```

### Error Handling

When an error occurs, the bapXdb Apple SDK throws an `bapXdbError` object with `message` and `code` properties. You can handle any errors in a catch block and present the `message` or `localizedDescription` to the user or handle it yourself based on the provided error information. Below is an example.

```swift
import bapXdb

func main() {
    let account = Account(client)
    
    do {
        let user = try await account.get()
        print(String(describing: user.toMap()))
    } catch {
        print(error.localizedDescription)
    }
}
```

### Learn more

You can use the following resources to learn more and get help

- 🚀 [Getting Started Tutorial](https://bapxdb.io/docs/getting-started-for-server)
- 📜 [bapXdb Docs](https://bapxdb.io/docs)
- 💬 [Discord Community](https://bapxdb.io/discord)
- 🚂 [bapXdb Swift Playground](https://github.com/bapxdb/playground-for-swift-server)
