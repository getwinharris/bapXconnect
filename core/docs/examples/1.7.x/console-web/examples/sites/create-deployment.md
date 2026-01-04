import { Client, Sites } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const sites = new Sites(client);

const result = await sites.createDeployment(
    '<SITE_ID>', // siteId
    document.getElementById('uploader').files[0], // code
    false, // activate
    '<INSTALL_COMMAND>', // installCommand (optional)
    '<BUILD_COMMAND>', // buildCommand (optional)
    '<OUTPUT_DIRECTORY>' // outputDirectory (optional)
);

console.log(result);
