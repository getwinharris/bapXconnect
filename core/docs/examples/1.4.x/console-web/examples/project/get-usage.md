import { Client, Project } from "@bapxdb.io/console";

const client = new Client();

const project = new Project(client);

client
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const promise = project.getUsage();

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});