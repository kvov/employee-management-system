const { MongoClient } = require('mongodb');
require('dotenv').config();

//create global database connection 
let db;

const { DB_URL } = process.env;
// create async function to connect to database
async function connectToDb() { 

    //Create client 
    const client = new MongoClient(DB_URL, { useNewUrlParser: true });
    //Connect to the client (await)
    await client.connect();
    
    //Return connection client.db
    db = client.db();
}

function getDb() {
    return db;
}
module.exports = { connectToDb, getDb };