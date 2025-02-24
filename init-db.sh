#!/bin/bash
set -e

# Wait for MariaDB to be ready
until mysql -h db -u root -pexample -e "SELECT 1"; do
  >&2 echo "MariaDB is unavailable - sleeping"
  sleep 1
done

# Import the dump.sql file
mysql -h db -u root -pexample bus_schedule < /docker-entrypoint-initdb.d/dump.sql