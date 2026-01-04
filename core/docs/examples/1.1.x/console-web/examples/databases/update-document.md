import { Client, Databases } from "bapxdb";

const client = new Client();

const databases = new Databases(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = databases.updateDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});