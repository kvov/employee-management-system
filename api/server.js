const express = require('express');
const { installHandler } = require('./api_handler');
const { connectToDb } = require('./db');
require('dotenv').config();

const app = express();
installHandler(app);
// create new async function to start the application and initialization database client
const { SERVER_PORT } = process.env;
async function startApp() { 
    try {
        // connect to database
        await connectToDb();

        app.listen(SERVER_PORT, () => {
            console.log(`API started on port ${SERVER_PORT}`);
        });
    }
    catch(error) { 
        console.log("Error starting the application", error);
    }
}

startApp();



