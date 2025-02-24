# Database Systems Setup and Configuration

This document describes the setup and configuration of various database systems used in the Bussiajad project.

## MySQL

### Installation and Setup
- MySQL is configured using Docker container with MySQL 8.0
- The database is accessible on port 3307
- Credentials:
  - Database: bus_schedule
  - User: test
  - Password: test123
- Data persistence is handled through volume mapping to ./sql/mysql/
- Schema and data are initialized using dump.sql

## Microsoft SQL Server

### Installation and Setup
- Using Microsoft SQL Server 2022 Express edition via Docker
- Accessible on port 1433
- Credentials:
  - SA Password: YourStrong@Passw0rd
- Express edition is used for development purposes
- Data and schema initialization through ./sql/mssql/ volume

## PostgreSQL

### Installation and Setup
- PostgreSQL 15 is used via Docker
- Accessible on port 5432
- Credentials:
  - Database: bus_schedule
  - User: test
  - Password: test123
- Schema initialization through ./sql/postgresql/ volume

## MongoDB

### Installation and Setup
- MongoDB 6.0 via Docker
- Accessible on port 27017
- Credentials:
  - Database: bus_schedule
  - Root User: root
  - Root Password: example
- Data initialization through ./sql/mongodb/ volume

## Redis

### Installation and Setup
- Redis 7.0 via Docker
- Accessible on port 6379
- No authentication required for development setup
- Data persistence through ./sql/redis/ volume

## Usage Instructions

1. Start all databases using Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Verify the databases are running:
   ```bash
   docker-compose ps
   ```

3. Each database system has its own dump file in the respective sql/<database> directory

4. To stop all databases:
   ```bash
   docker-compose down
   ```

## Connection Testing

After starting the containers, you can test connections using the following commands:

### MySQL
```bash
docker exec -it bussiajad-mysql-1 mysql -utest -ptest123 bus_schedule
```

### PostgreSQL
```bash
docker exec -it bussiajad-postgres-1 psql -U test -d bus_schedule
```

### MongoDB
```bash
docker exec -it bussiajad-mongodb-1 mongosh -u root -p example
```

### Redis
```bash
docker exec -it bussiajad-redis-1 redis-cli
```

### SQL Server
```bash
docker exec -it bussiajad-mssql-1 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd
```
