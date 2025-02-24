-- PostgreSQL dump for bus_schedule database

-- Create tables
CREATE TABLE IF NOT EXISTS stops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    route_number VARCHAR(10) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS schedule (
    id SERIAL PRIMARY KEY,
    route_id INTEGER NOT NULL,
    stop_id INTEGER NOT NULL,
    arrival_time TIME NOT NULL,
    departure_time TIME NOT NULL,
    day_of_week SMALLINT NOT NULL, -- 1=Monday, 7=Sunday
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (stop_id) REFERENCES stops(id)
);

-- Insert sample data
INSERT INTO stops (name, latitude, longitude) VALUES
    ('Kesklinn', 59.4370, 24.7536),
    ('Ülemiste', 59.4231, 24.7991),
    ('Mustamäe', 59.4076, 24.6869);

INSERT INTO routes (route_number, description) VALUES
    ('1A', 'Kesklinn - Mustamäe'),
    ('2', 'Ülemiste - Kesklinn'),
    ('3B', 'Mustamäe - Ülemiste');

INSERT INTO schedule (route_id, stop_id, arrival_time, departure_time, day_of_week) VALUES
    (1, 1, '08:00:00', '08:02:00', 1),
    (1, 3, '08:15:00', '08:17:00', 1),
    (2, 2, '09:00:00', '09:02:00', 1),
    (2, 1, '09:20:00', '09:22:00', 1),
    (3, 3, '10:00:00', '10:02:00', 1),
    (3, 2, '10:25:00', '10:27:00', 1);

-- Example queries for testing:

-- 1. Count of routes per stop with WHERE and GROUP BY
-- SELECT s.name, COUNT(DISTINCT r.id) as route_count
-- FROM stops s
-- JOIN schedule sc ON s.id = sc.stop_id
-- JOIN routes r ON r.id = sc.route_id
-- WHERE s.latitude > 59.40
-- GROUP BY s.id, s.name
-- LIMIT 5;

-- 2. Average time between arrival and departure with aggregation
-- SELECT r.route_number,
--        AVG(EXTRACT(EPOCH FROM (departure_time - arrival_time))) as avg_stop_time_seconds
-- FROM schedule sc
-- JOIN routes r ON r.id = sc.route_id
-- GROUP BY r.id, r.route_number
-- HAVING AVG(EXTRACT(EPOCH FROM (departure_time - arrival_time))) > 60
-- ORDER BY avg_stop_time_seconds DESC;

-- 3. Stops with most frequent service
-- SELECT s.name,
--        COUNT(*) as total_stops,
--        COUNT(DISTINCT r.id) as unique_routes
-- FROM schedule sc
-- JOIN stops s ON s.id = sc.stop_id
-- JOIN routes r ON r.id = sc.route_id
-- GROUP BY s.id, s.name
-- ORDER BY total_stops DESC
-- LIMIT 3;
