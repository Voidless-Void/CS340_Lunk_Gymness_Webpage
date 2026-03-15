-- Created by: Carter Deal and Samuel Dressel

-- Citation for the following code:
-- Date: 2/23/2026
-- Citation for use of AI tools:
-- Utilized VSCODE Github Copilot AI-powered autocompletion to assist in writing the procedure code. No prompts were used.
-- Source: https://code.visualstudio.com/docs/copilot/ai-powered-suggestions 
DELIMITER //

DROP PROCEDURE IF EXISTS DeleteEntry;

-- Deletes an entry from a specified table based on the provided ID and table name
-- originality: Original work written by Carter Deal and Samuel Dressel.
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

DROP PROCEDURE IF EXISTS AddEntry;

-- Adds a new entry to a specified table based on the provided JSON data and table name
-- Originality: assisted by VSCODE Github Copilot AI-powered autocompletion, but the overall structure and logic of the procedure were written by Carter Deal and Samuel Dressel.
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
    INSERT INTO Trainers (firstName, lastName, biography)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.firstName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.lastName')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.biography'))
    );
  ELSEIF tableName = 'classes' THEN
    INSERT INTO Classes (className, scheduleTime, roomNumber, trainerID, capacity, equipmentID)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.scheduleTime')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.trainerID')),
      IF (JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')) = 'Strength Training' OR JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')) = '101', 10, 
       IF (JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')) = 'HIIT Blast' OR JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')) = '102', 15, 
       IF (JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')) = '103', 20, 25))),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.equipmentID'))
    );
  ELSEIF tableName = 'classregistrations' THEN
    INSERT INTO ClassRegistrations (memberID, classID, registrationDate, classType)
    VALUES (
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.memberID')),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.classID')),
      NOW(),
      JSON_UNQUOTE(JSON_EXTRACT(data, '$.classType'))
    );
  END IF;
END //

DROP PROCEDURE IF EXISTS EditEntry;

-- Edits an existing entry in a specified table based on the provided ID, JSON data, and table name
-- Originality: assisted by VSCODE Github Copilot AI-powered autocompletion, but the overall structure and logic of the procedure were written by Carter Deal and Samuel Dressel.
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
      biography = JSON_UNQUOTE(JSON_EXTRACT(data, '$.biography'))
    WHERE trainerID = id;
  ELSEIF tableName = 'classes' THEN
    UPDATE Classes SET
      className = JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')),
      scheduleTime = JSON_UNQUOTE(JSON_EXTRACT(data, '$.scheduleTime')),
      roomNumber = JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')),
      trainerID = JSON_UNQUOTE(JSON_EXTRACT(data, '$.trainerID')),
      capacity = IF (JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')) = 'Strength Training' OR JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')) = '101', 10, 
                  IF (JSON_UNQUOTE(JSON_EXTRACT(data, '$.className')) = 'HIIT Blast' OR JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')) = '102', 15, 
                  IF (JSON_UNQUOTE(JSON_EXTRACT(data, '$.roomNumber')) = '103', 20, 25))),
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