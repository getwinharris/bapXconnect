import { Client, Account } from "bapxdb";

const client = new Client()
    .setEndpoint('https://cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateMfaChallenge(
    '<CHALLENGE_ID>', // challengeId
    '<OTP>' // otp
);

console.log(result);
