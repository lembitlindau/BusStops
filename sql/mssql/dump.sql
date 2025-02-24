-- SQL Server dump for bus_schedule database

-- Create database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'bus_schedule')
BEGIN
    CREATE DATABASE bus_schedule;
END
GO

USE bus_schedule;
GO

-- Create tables
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='stops' and xtype='U')
CREATE TABLE stops (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='routes' and xtype='U')
CREATE TABLE routes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    route_number NVARCHAR(10) NOT NULL,
    description NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='schedule' and xtype='U')
CREATE TABLE schedule (
    id INT IDENTITY(1,1) PRIMARY KEY,
    route_id INT NOT NULL,
    stop_id INT NOT NULL,
    arrival_time TIME NOT NULL,
    departure_time TIME NOT NULL,
    day_of_week TINYINT NOT NULL, -- 1=Monday, 7=Sunday
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (stop_id) REFERENCES stops(id)
);

-- Insert sample data
INSERT INTO stops (name, latitude, longitude) VALUES
    (N'Kesklinn', 59.4370, 24.7536),
    (N'Ülemiste', 59.4231, 24.7991),
    (N'Mustamäe', 59.4076, 24.6869);

INSERT INTO routes (route_number, description) VALUES
    ('1A', N'Kesklinn - Mustamäe'),
    ('2', N'Ülemiste - Kesklinn'),
    ('3B', N'Mustamäe - Ülemiste');

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
-- ORDER BY route_count DESC
-- OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;

-- 2. Average time between arrival and departure with aggregation
-- SELECT r.route_number,
--        AVG(DATEDIFF(SECOND, arrival_time, departure_time)) as avg_stop_time_seconds
-- FROM schedule sc
-- JOIN routes r ON r.id = sc.route_id
-- GROUP BY r.id, r.route_number
-- HAVING AVG(DATEDIFF(SECOND, arrival_time, departure_time)) > 60
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
-- OFFSET 0 ROWS FETCH NEXT 3 ROWS ONLY;
