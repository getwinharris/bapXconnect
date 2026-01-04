import { Client, Functions } from "@bapxdb.io/console";

const client = new Client();

const functions = new Functions(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = functions.create('[FUNCTION_ID]', '[NAME]', 'node-14.5');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});