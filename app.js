const express = require('express');
const mysql = require('mysql');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error:', err);
    } else {
        console.log('MySQL Connected');
    }
});

// MongoDB Connection
const mongoUri = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(mongoUri);

app.get('/lecturers', async (req, res) => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('proj2024MongoDB');
        const lecturers = await db.collection('lecturers').find().toArray();
        res.json(lecturers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching lecturers');
    } finally {
        await mongoClient.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
