import { Client, Functions, TemplateReferenceType } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const functions = new Functions(client);

const result = await functions.createTemplateDeployment({
    functionId: '<FUNCTION_ID>',
    repository: '<REPOSITORY>',
    owner: '<OWNER>',
    rootDirectory: '<ROOT_DIRECTORY>',
    type: TemplateReferenceType.Commit,
    reference: '<REFERENCE>',
    activate: false // optional
});

console.log(result);
