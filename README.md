# BusStops

## Project Description
BusStops is a web application that allows users to view and manage bus departure times for various bus stops. Users can add new bus stops and departure times, and view upcoming departures.

## Features
- [x] View bus departure times for different stops
- [x] View departures in a modal by clicking on bus stop names
- [x] Add new bus departures with departure time and day type (weekdays/weekends)
- [ ] Add new bus stops
- [ ] Toggle visibility of all departures for each stop

## Current Functionality
1. **View Bus Stops**: See a list of all available bus stops
2. **View Departures**: Click on any bus stop name to see departures in a modal, sorted by time
3. **Add Departures**: Use the form on the right side to add new bus departures:
   - Choose a bus stop from dropdown
   - Enter departure time
   - Enter route number
   - Enter destination
   - Select day type (weekdays or weekends)
   - Click the green "Add Departure" button

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express
- Handlebars
- MariaDB

### Prerequisites
- Node.js
- MariaDB


## Getting Started
1. Import database schema:
```
mysql -u root -p -e "CREATE DATABASE bus_schedule"
mysql -u root -p bus_schedule < schema.sql
```
2. Install dependencies:
```
npm install
```
3. Copy the example environment file:
```bash
cp .env.example .env
```
Edit `.env` with your configuration:
```env
DB_HOST=localhost      # Your database host
DB_USER=root          # Your database username
DB_PASSWORD=root      # Your database password
DB_NAME=bus_schedule  # Your database name
DB_CONNECTION_LIMIT=4 # Maximum number of database connections
PORT=2999            # Port for the application
```

Note: Never commit your `.env` file as it may contain sensitive information.

### Usage
1. Run the application:
```
node app.js
```
2. Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.
