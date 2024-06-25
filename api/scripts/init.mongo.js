const { MongoClient } = require('mongodb');

// Add Connection URL
const url = 'mongodb+srv://kvov79:vovkodav79@cluster0.ahkokhb.mongodb.net/';
// Database Name
const dbName = 'ems';

async function initializeDatabase() {
    const client = new MongoClient(url);

    try {
        await client.connect();

        const db = client.db(dbName);

        console.log('Database connected.');

        // Create indexes
        await db.collection('employees').createIndex({ id: 1 }, { unique: true });
        await db.collection('employees').createIndex({ firstName: 1 });
        await db.collection('employees').createIndex({ lastName: 1 });
        await db.collection('employees').createIndex({ age: 1 });

        console.log('Initialization complete.');

    } catch (err) {
        console.error('Initialization error:', err);
    } finally {
        await client.close();
    }
}

// Call the initialization function
initializeDatabase();