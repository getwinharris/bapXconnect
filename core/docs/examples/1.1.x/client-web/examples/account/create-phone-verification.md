import { Client, Account } from "bapxdb";

const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = account.createPhoneVerification();

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});