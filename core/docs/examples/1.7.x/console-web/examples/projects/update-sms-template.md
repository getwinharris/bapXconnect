import { Client, Projects, SmsTemplateType, SmsTemplateLocale } from "@bapxdb.io/console";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const projects = new Projects(client);

const result = await projects.updateSmsTemplate(
    '<PROJECT_ID>', // projectId
    SmsTemplateType.Verification, // type
    SmsTemplateLocale.Af, // locale
    '<MESSAGE>' // message
);

console.log(result);
