CREATE TABLE IF NOT EXISTS departures_log (
                                              id INT AUTO_INCREMENT PRIMARY KEY,
                                              departure_id INT NOT NULL,              -- Viide muudetud väljumisele
                                              old_departure_time TIME,                -- Vana väljumisaeg
                                              new_departure_time TIME,                -- Uus väljumisaeg
                                              changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Muutmise aeg
);

-- Salvestab vana ja uue aja ning muudatuse tegemise aja logitabelisse
DELIMITER $$

CREATE TRIGGER after_departures_update
    AFTER UPDATE ON departures
    FOR EACH ROW
BEGIN
    INSERT INTO departures_log (departure_id, old_departure_time, new_departure_time, changed_at)
    VALUES (OLD.id, OLD.departure_time, NEW.departure_time, NOW());
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER before_departure_insert
    BEFORE INSERT ON departures
    FOR EACH ROW
BEGIN
    -- Kontroll, et sama peatuse ja aja kombinatsioon ei kattu
    IF EXISTS (
        SELECT 1
        FROM departures
        WHERE station_id = NEW.station_id
          AND departure_time = NEW.departure_time
          AND sequence_number = NEW.sequence_number
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Duplicate departure time for the same station is not allowed';
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER kontrolli_saabumisajad_tr
    BEFORE INSERT ON departures
    FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1
        FROM departures
        WHERE station_id = NEW.station_id
          AND departure_time = NEW.departure_time
          AND sequence_number > NEW.sequence_number
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saabumisaeg peab olema hilisem kui eelmisel peatusel!';
    END IF;
END$$

DELIMITER ;