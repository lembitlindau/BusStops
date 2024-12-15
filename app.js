require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mariadb = require('mariadb');
const app = express();
const port = process.env.PORT || 3000;

// Create a connection pool
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 5
});

// Middleware to parse JSON bodies
app.use(express.json());

// Set up Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Basic route
app.get('/', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const stops = await conn.query('SELECT * FROM stops');
        
        res.render('home', {
            title: 'Bus Stops',
            stops: stops
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('home', {
            title: 'Error',
            error: 'Failed to fetch bus stops'
        });
    } finally {
        if (conn) conn.release(); // Release connection back to pool
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});