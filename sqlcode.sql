set foreign_key_checks = 0;
create or replace table stations
(
    id        int unsigned auto_increment
        primary key,
    name      varchar(191) not null,
    latitude  double       not null,
    longitude double       not null
);
INSERT INTO bus_departure_db.stations (id, name, latitude, longitude) VALUES (1, 'Tornimäe', 59.43319758514315, 24.76134011041852);
INSERT INTO bus_departure_db.stations (id, name, latitude, longitude) VALUES (2, 'Lehmja', 59.37511548839437, 24.848417464740685);

create or replace table departures
(
    id             int(11) unsigned auto_increment
        primary key,
    departure_time time         not null,
    station_id     int unsigned not null,
    constraint departures_stations_id_fk
        foreign key (station_id) references stations (id)
);
INSERT INTO departures (id, departure_time, station_id) VALUES (1, '11:42:15', 1);
set foreign_key_checks = 1;

create table routes
(
    id               int(11) unsigned auto_increment
        primary key,
    departure_time   time         not null,
    station_id       int unsigned not null,
    line_id          int unsigned not null,
    sequence_number  int unsigned not null,
    constraint routes_stations_id_fk
        foreign key (station_id) references stations (id),
    constraint routes_lines_id_fk
        foreign key (line_id) references `lines` (id)
);
insert into `lines` (id, name) values (1, 'Kesklinn-Jüri');
insert into routes (id, departure_time, station_id, line_id, sequence_number) values (1, '11:42:15', 1, 1, 1);
insert into routes (id, departure_time, station_id, line_id, sequence_number) values (2, '12:00:00', 2, 1, 2);
