import { Client, Assistant } from "@bapxdb.io/console";

const client = new Client();

const assistant = new Assistant(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = assistant.chat('[PROMPT]');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});