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
        DELETE FROM ClassRegistrations WHERE classRegID = id;
    END IF;
END //

CREATE PROCEDURE AddEntry(IN tableName VARCHAR(255), IN data JSON)
BEGIN
  IF tableName = 'equipment' THEN
    INSERT INTO Equipment (equipmentName, category, `condition`, maintenanceDate)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.equipmentName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.category')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.condition')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.maintenanceDate'))
    );
  ELSEIF tableName = 'members' THEN
    INSERT INTO Members (firstName, lastName, email, phone, membershipType, joinDate)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.firstName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.lastName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.email')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.phone')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.membershipType')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.joinDate'))
    );
  ELSEIF tableName = 'trainers' THEN
    INSERT INTO Trainers (firstName, lastName, specialty)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.firstName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.lastName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.specialty'))
    );
  ELSEIF tableName = 'classes' THEN
    INSERT INTO Classes (className, scheduleTime, roomNumber, trainerID, capacity, equipmentID)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.scheduleTime')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.trainerID')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.capacity')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.equipmentID'))
    );
  ELSEIF tableName = 'classregistrations' THEN
    INSERT INTO ClassRegistrations (memberID, classID, registrationDate, classType)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.memberID')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.classID')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.registrationDate')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.classType'))
    );
  END IF;
END //

DROP PROCEDURE IF EXISTS EditEntry;

CREATE PROCEDURE EditEntry(IN id INT, IN tableName VARCHAR(255), IN data JSON)
BEGIN
  IF tableName = 'equipment' THEN
    UPDATE Equipment SET
      equipmentName = JSON_UNQUOTE(JSON_EXTRACT(data, '$.equipmentName')),
      category = JSON_UNQUOTE(JSON_EXTRACT(data, '$.category')),
      `condition` = JSON_UNQUOTE(JSON_EXTRACT(data, '$.condition')),
      maintenanceDate = JSON_UNQUOTE(JSON_EXTRACT(data, '$.maintenanceDate'))
    WHERE equipmentID = id;
  ELSEIF tableName = 'members' THEN
    UPDATE Members SET
      firstName = JSON_UNQUOTE(JSON_EXTRACT(data, '$.firstName')),
      lastName = JSON_UNQUOTE(JSON_EXTRACT(data, '$.lastName')),
      email = JSON_UNQUOTE(JSON_EXTRACT(data, '$.email')),
      phone = JSON_UNQUOTE(JSON_EXTRACT(data, '$.phone')),
      membershipType = JSON_UNQUOTE(JSON_EXTRACT(data, '$.membershipType')),
      joinDate = JSON_UNQUOTE(JSON_EXTRACT(data, '$.joinDate'))
    WHERE memberID = id;
  ELSEIF tableName = 'trainers' THEN
    UPDATE Trainers SET
      firstName = JSON_UNQUOTE(JSON_EXTRACT(data, '$.firstName')),
      lastName = JSON_UNQUOTE(JSON_EXTRACT(data, '$.lastName')),
      specialty = JSON_UNQUOTE(JSON_EXTRACT(data, '$.specialty'))
    WHERE trainerID = id;
  ELSEIF tableName = 'classes' THEN
    UPDATE Classes SET
      className = JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')),
      scheduleTime = JSON_UNQUOTE(JSON_EXTRACT(data, '$.scheduleTime')),
      roomNumber = JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')),
      trainerID = JSON_UNQUOTE(JSON_EXTRACT(data, '$.trainerID')),
      capacity = JSON_UNQUOTE(JSON_EXTRACT(data, '$.capacity')),
      equipmentID = JSON_UNQUOTE(JSON_EXTRACT(data, '$.equipmentID'))
    WHERE classID = id;
  ELSEIF tableName = 'classregistrations' THEN
    UPDATE ClassRegistrations SET
      memberID = JSON_UNQUOTE(JSON_EXTRACT(data, '$.memberID')),
      classID = JSON_UNQUOTE(JSON_EXTRACT(data, '$.classID')),
      registrationDate = JSON_UNQUOTE(JSON_EXTRACT(data, '$.registrationDate')),
      classType = JSON_UNQUOTE(JSON_EXTRACT(data, '$.classType'))
    WHERE classRegID = id;
  END IF;
END //

DELIMITER ;