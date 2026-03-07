--Queries for Trainers Table
SELECT trainerID, firstName, lastName, specialty FROM Trainers;
DELETE FROM Trainers WHERE trainerID = ?;
UPDATE Trainers SET trainerID = trainerID, firstName = firstName, lastName = lastName, specialty=specialty WHERE trainerID = ?;
INSERT INTO Trainers (trainerID, firstName, lastName, specialty) VALUES (@trainerIDInput,@firstNameInput, @lastNameInput, @specialtyInput);

--Queries for Classes Table
SELECT classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID FROM Classes;
DELETE FROM Classes WHERE classID = ?;
UPDATE Classes SET trainerID = trainerID, equipmentID = equipmentID, classID = classID, className = className, scheduleTime = scheduleTime, roomNumber = roomNumber, capacity = capacity WHERE classID = ?;
INSERT INTO Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID) VALUES (@classIDInput, @classNameInput, @scheduleTimeInput, @roomNumberInput, @capacityInput, @trainerIDInput, @equipmentIDInput);

--Queries for ClassRegistrations
SELECT classRegID, memberID, classID, registrationDate, classType FROM ClassRegistrations;
DELETE FROM ClassRegistrations WHERE classRegID = ?;
UPDATE ClassRegistrations SET classRegID = classRegID, memberID = memberID, classID = classID, registrationDate = registrationDate, classType = classType WHERE classRegID = ?;
INSERT INTO ClassRegistrations (classRegID, memberID, classID, registrationDate, classType) VALUES (@classRegIDInput, @memberIDInput, @classIDinput, @registrationDateInput, @classTypeInput);


--Queries for Equipment
SELECT equipmentID, equipmentName, category, maintenanceDate, condition FROM Equipment; 
DELETE FROM Equipment WHERE equipmentID = ?;
UPDATE Equipment SET equipmentID = equipmentID, equipmentName = equipmentName, category = category, maintenanceDate = maintenanceDate, condition = condition WHERE equipmentID = ?;
INSERT INTO Equipment (equipmentID, equipmentName, category, maintenanceDate, condition) VALUES (@equipmentIDInput, @equipmentNameInput, @categoryInput, @maintenanceDateInput, @conditionInput);


--Queries for Members
SELECT memberID, firstName, lastName, email, phone, membershipType, joinDate FROM Members;
DELETE FROM Members WHERE memberID = ?;
UPDATE Members SET memberID = memberID, firstName = firstName, lastName = lastName, email = email, phone = phone, membershipType = membershipType, joinDate = joinDate WHERE memberID = ?;
INSERT INTO Members (memberID, firstName, lastName, email, phone, membershipType, joinDate) VALUES (@memberIDInput, @firstNameInput, @lastNameInput, @emailInput, @phoneInput, @membershipTypeInput, @joinDateInput);





