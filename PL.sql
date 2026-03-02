-- Created by: Carter Deal and Samuel Dressel
DELIMITER //

DROP PROCEDURE IF EXISTS DeleteEntry;

CREATE PROCEDURE DeleteEntry(IN id INT, IN tableName VARCHAR(255))
BEGIN
    IF tableName = 'members' THEN
        DELETE FROM Members WHERE memberID = id;
    ELSEIF tableName = 'trainers' THEN
        DELETE FROM Trainers WHERE trainerID = id;
    ELSEIF tableName = 'classes' THEN
        DELETE FROM Classes WHERE classID = id;
    ELSEIF tableName = 'equipment' THEN
        DELETE FROM Equipment WHERE equipmentID = id;
    ELSEIF tableName = 'classregistrations' THEN
        DELETE FROM ClassRegistrations WHERE registrationID = id;
    END IF;
END //

DELIMITER ;