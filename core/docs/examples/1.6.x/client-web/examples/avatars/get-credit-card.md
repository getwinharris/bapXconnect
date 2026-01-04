import { Client, Avatars, CreditCard } from "bapxdb";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const avatars = new Avatars(client);

const result = avatars.getCreditCard(
    CreditCard.AmericanExpress, // code
    0, // width (optional)
    0, // height (optional)
    0 // quality (optional)
);

console.log(result);
