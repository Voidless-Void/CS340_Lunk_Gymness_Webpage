--Queries for Trainers Table
SELECT * FROM Trainers;
DELETE FROM Trainers WHERE criteria;
UPDATE Trainers SET trainerID = trainerID, firstName = firstName, lastName = lastName, specialty=specialty WHERE criteria;
INSERT INTO Trainers (trainerID, firstName, lastName, specialty) VALUES (@trainerIDInput,@firstNameInput, @lastNameInput, @specialtyInput);

--Queries for Classes Table
SELECT * FROM Classes;
DELETE FROM Classes WHERE criteria;
UPDATE Classes SET trainerID = trainerID, equipmentID = equipmentID, classID = classID, className = className, scheduleTime = scheduleTime, roomNumber = roomNumber, capacity = capacity WHERE criteria;
INSERT INTO Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID) VALUES (@classIDInput, @classNameInput, @scheduleTimeInput, @roomNumberInput, @capacityInput, @trainerIDInput, @equipmentIDInput);

--Queries for ClassRegistrations
SELECT * FROM ClassRegistrations;
DELETE FROM ClassRegistrations WHERE criteria;
UPDATE ClassRegistrations SET classregID = classregID, memberID = memberID, classID = classID, registrationDate = registrationDate, classType = classType WHERE condition;
INSERT INTO ClassRegistrations (classregID, memberID, classID, registrationDate, classType) VALUES (@classregIDInput, @memberIDInput, @classIDinput, @registrationDateInput, @classTypeInput);


--Queries for Equipment
SELECT * FROM Equipment; 
DELETE FROM Equipment WHERE criteria;
UPDATE Equipment SET equipmentID = equipmentID, equipmentName = equipmentName, category = category, maintenanceDate = maintenanceDate, condition = condition WHERE criteria;
INSERT INTO Equipment (equipmentID, equipmentName, category, maintenanceDate, condition) VALUES (@equipmentIDInput, @equipmentNameInput, @categoryInput, @maintenanceDateInput, @conditionInput);


--Queries for Members
SELECT * FROM Members;
DELETE FROM Members WHERE criteria;
UPDATE Members SET memberID = memberID, firstName = firstName, lastName = lastName, email = email, phone = phone, membershipType = membershipType, joinDate = joinDate WHERE criteria;
INSERT INTO Members (memberID, firstName, lastName, email, phone, membershipType, joinDate) VALUES (@memberIDInput, @firstNameInput, @lastNameInput, @emailInput, @phoneInput, @membershipTypeInput, @joinDateInput);





