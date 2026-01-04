import { Client, Projects, SMTPSecure } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.createSMTPTest({
    projectId: '<PROJECT_ID>',
    emails: [],
    senderName: '<SENDER_NAME>',
    senderEmail: 'email@example.com',
    host: '',
    replyTo: 'email@example.com', // optional
    port: null, // optional
    username: '<USERNAME>', // optional
    password: '<PASSWORD>', // optional
    secure: SMTPSecure.Tls // optional
});

console.log(result);
