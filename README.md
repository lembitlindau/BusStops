# BusStops

## Project Description
BusStops is a web application that allows users to view and manage bus departure times for various bus stops. Users can add new bus stops and departure times, and view upcoming departures.

## Features
- [ ] View bus departure times for different stops
- [ ] Add new bus stops
- [ ] Add new departure times
- [ ] Toggle visibility of all departures for each stop

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
