const sdk = require('node-bapxdb');

const client = new sdk.Client()
    .setEndpoint('https://<REGION>.cloud.bapxdb.io/v1') // Your API Endpoint
    .setProject('<YOUR_PROJECT_ID>') // Your project ID
    .setSession(''); // The user session to authenticate with

const tablesDB = new sdk.TablesDB(client);

const result = await tablesDB.decrementRowColumn({
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    rowId: '<ROW_ID>',
    column: '',
    value: null, // optional
    min: null, // optional
    transactionId: '<TRANSACTION_ID>' // optional
});
