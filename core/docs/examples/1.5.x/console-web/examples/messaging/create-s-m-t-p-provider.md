import { Client,  Messaging } from "@bapxdb.io/console";

const client = new Client();

const messaging = new Messaging(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = messaging.createSMTPProvider('[PROVIDER_ID]', '[NAME]', '[HOST]');

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});