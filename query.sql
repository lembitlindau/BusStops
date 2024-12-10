-- Select line 1 stations
select s.name
from stations s
         join routes r on s.id = r.station_id
where r.line_id = 1

-- How many lines there are?
select count(distinct line_id) as line_count
from routes;
