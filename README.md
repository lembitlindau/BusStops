# Bus Departure Times

This project is a web application for managing and displaying bus departure times for different stops. It allows users to add, remove, and view upcoming departures, as well as import and export departure data in CSV format.

## Features

- Add and remove bus departure times
- View next three departures or all departures for each stop
- Separate schedules for weekdays and weekends
- Import and export departure data in CSV format
- Real-time updates of departure times

## Technologies Used

- HTML
- CSS
- JavaScript
- SQL
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/lembitlindau/bus-departure-times.git
    ```
2. Navigate to the project directory:
    ```sh
    cd bus-departure-times
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Open `index.html` in your web browser to view the application.
2. Use the form to add new departure times.
3. Click on the "Show All" button to toggle between viewing the next three departures and all departures for each stop.
4. Use the import and export buttons to manage departure data in CSV format.

## SQL Database Setup

1. Create the database and tables using the following SQL script:
    ```sql
    CREATE DATABASE bus_departure_db;

    USE bus_departure_db;

    CREATE TABLE departures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        departure_time TIME NOT NULL
    );

    CREATE TABLE routes (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        departure_time TIME NOT NULL,
        station_id INT UNSIGNED NOT NULL,
        line_id INT UNSIGNED NOT NULL,
        sequence_number INT UNSIGNED NOT NULL,
        CONSTRAINT routes_stations_id_fk FOREIGN KEY (station_id) REFERENCES stations (id),
        CONSTRAINT routes_lines_id_fk FOREIGN KEY (line_id) REFERENCES `lines` (id)
    );

    INSERT INTO `lines` (id, name) VALUES (1, 'Kesklinn-Jüri');
    INSERT INTO routes (id, departure_time, station_id, line_id, sequence_number) VALUES (1, '11:42:15', 1, 1, 1);
    INSERT INTO routes (id, departure_time, station_id, line_id, sequence_number) VALUES (2, '12:00:00', 2, 1, 2);
    ```

## License

This project is licensed under the MIT License.