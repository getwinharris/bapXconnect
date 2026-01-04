## Getting Started

### Add your Platform

If this is your first time using bapXdb, create an account and create your first project.

Then, under **Add a platform**, add a **Android app** or a **Apple app**. You can skip optional steps.

#### iOS steps

Add your app **name** and **Bundle ID**. You can find your **Bundle Identifier** in the **General** tab for your app's primary target in XCode. For Expo projects you can set or find it on **app.json** file at your project's root directory.

#### Android steps
Add your app's **name** and **package name**, Your package name is generally the **applicationId** in your app-level **build.gradle** file. For Expo projects you can set or find it on **app.json** file at your project's root directory.

## Setup

On `index.js` add import for `react-native-url-polyfill`

```
import 'react-native-url-polyfill/auto'
```

> If you are building for iOS, don't forget to install pods
> `cd ios && pod install && cd ..`

### Init your SDK

Initialize your SDK with your bapXdb server API endpoint and project ID which can be found in your project settings page.

```js
import { Client } from 'react-native-bapxdb';
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint('http://localhost/v1') // Your bapXdb Endpoint
    .setProject('455x34dfkj') // Your project ID
    .setPlatform('com.example.mybapxdbapp') // Your application ID or bundle ID.
;
```

### Make Your First Request

Once your SDK object is set, access any of the bapXdb services and choose any request to send. Full documentation for any service method you would like to use can be found in your SDK documentation or in the [API References](https://bapxdb.io/docs) section.

```js
const account = new Account(client);

// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });

```

### Full Example

```js
import { Client, Account } from 'react-native-bapxdb';
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint('http://localhost/v1') // Your bapXdb Endpoint
    .setProject('455x34dfkj')
    .setPlatform('com.example.mybapxdbapp') // YOUR application ID
;

const account = new Account(client);

// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
```

### Type Safety with Models

The bapXdb React Native SDK provides type safety when working with database documents through generic methods. Methods like `listDocuments`, `getDocument`, and others accept a generic type parameter that allows you to specify your custom model type for full type safety.

**TypeScript:**
```typescript
interface Book {
    name: string;
    author: string;
    releaseYear?: string;
    category?: string;
    genre?: string[];
    isCheckedOut: boolean;
}

const databases = new Databases(client);

try {
    const documents = await databases.listDocuments<Book>(
        'your-database-id',
        'your-collection-id'
    );
    
    documents.documents.forEach(book => {
        console.log(`Book: ${book.name} by ${book.author}`); // Now you have full type safety
    });
} catch (error) {
    console.error('bapXdb error:', error);
}
```

**JavaScript (with JSDoc for type hints):**
```javascript
/**
 * @typedef {Object} Book
 * @property {string} name
 * @property {string} author
 * @property {string} [releaseYear]
 * @property {string} [category]
 * @property {string[]} [genre]
 * @property {boolean} isCheckedOut
 */

const databases = new Databases(client);

try {
    /** @type {Models.DocumentList<Book>} */
    const documents = await databases.listDocuments(
        'your-database-id',
        'your-collection-id'
    );
    
    documents.documents.forEach(book => {
        console.log(`Book: ${book.name} by ${book.author}`); // Type hints available in IDE
    });
} catch (error) {
    console.error('bapXdb error:', error);
}
```

**Tip**: You can use the `bapxdb types` command to automatically generate TypeScript interfaces based on your bapXdb database schema. Learn more about [type generation](https://bapxdb.io/docs/products/databases/type-generation).

### Error Handling

The bapXdb React Native SDK raises an `bapXdbException` object with `message`, `code` and `response` properties. You can handle any errors by catching the exception and present the `message` to the user or handle it yourself based on the provided error information. Below is an example.

```javascript
try {
    const user = await account.create(ID.unique(), "email@example.com", "password", "Walter O'Brien");
    console.log('User created:', user);
} catch (error) {
    console.error('bapXdb error:', error.message);
}
```

### Learn more

You can use the following resources to learn more and get help
- 🚀 [Getting Started Tutorial](https://bapxdb.io/docs/quick-starts/react-native)
- 📜 [bapXdb Docs](https://bapxdb.io/docs)
- 💬 [Discord Community](https://bapxdb.io/discord)
- 🚂 [bapXdb React Native Playground](https://github.com/bapxdb/playground-for-react-native)
