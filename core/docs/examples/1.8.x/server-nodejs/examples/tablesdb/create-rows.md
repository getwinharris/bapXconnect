const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setKey('<YOUR_API_KEY>'); // Your secret API key

const tablesDB = new sdk.TablesDB(client);

const result = await tablesDB.createRows({
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    rows: [],
    transactionId: '<TRANSACTION_ID>' // optional
});
