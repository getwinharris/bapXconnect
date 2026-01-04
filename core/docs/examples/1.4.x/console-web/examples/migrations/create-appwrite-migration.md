import { Client, Migrations } from "@bapxdb.io/console";

const client = new Client();

const migrations = new Migrations(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = migrations.createbapXdbMigration([], 'https://example.com', '[PROJECT_ID]', '[API_KEY]');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});