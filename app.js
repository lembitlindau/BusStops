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

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

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

// API endpoint to get departures for a specific stop
app.get('/api/departures/:stopId', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const stopId = parseInt(req.params.stopId);
        
        // Get departures for the stop, sorted by departure time
        const departures = await conn.query(`
            SELECT d.*, s.name as stop_name 
            FROM departures d 
            JOIN stops s ON d.stop_id = s.id 
            WHERE d.stop_id = ? 
            ORDER BY d.departure_time ASC
        `, [stopId]);
        
        res.json(departures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch departures' });
    } finally {
        if (conn) conn.release();
    }
});

// POST endpoint to add a new departure
app.post('/add-departure', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const { stop_id, departure_time, route_number, destination, day_type } = req.body;
        
        // Validate required fields
        if (!stop_id || !departure_time || !route_number || !destination || !day_type) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }
        
        // Insert new departure
        await conn.query(`
            INSERT INTO departures (stop_id, departure_time, route_number, destination, day_type)
            VALUES (?, ?, ?, ?, ?)
        `, [stop_id, departure_time, route_number, destination, day_type]);
        
        res.json({ success: true, message: 'Departure added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to add departure' 
        });
    } finally {
        if (conn) conn.release();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});