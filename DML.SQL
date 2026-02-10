--Queries for Trainers Table
SELECT * FROM Trainers;
DELETE FROM Trainers WHERE condition;
UPDATE Trainers SET trainerID = trainerID, firstName = firstName, lastName = lastName, specialty=specialty WHERE condition;
INSERT INTO Trainers (trainerID, firstName, lastName, specialty) VALUES (@trainerIDInput,@firstNameInput, @lastNameInput, @specialtyInput);

--Queries for Classes Table
SELECT * FROM Classes;
DELETE FROM Classes WHERE condition;
UPDATE Classes SET trainerID = trainerID, equipmentID = equipmentID, classID = classID, className = className, scheduleTime = scheduleTime, roomNumber = roomNumber, capacity = capacity WHERE condition;
INSERT INTO Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID) VALUES (@classIDInput, @classNameInput, @scheduleTimeInput, @roomNumberInput, @capacityInput, @trainerIDInput, @equipmentIDInput);

--Queries for ClassRegistrations
SELECT * FROM ClassRegistrations;
DELETE FROM ClassRegistrations;
UPDATE ClassRegistrations SET classregID = classregID, memberID = memberID, classID = classID, registrationDate = registrationDate, classType = classType WHERE condition;
INSERT INTO ClassRegistrations (classregID, memberID, classID, registrationDate, classType) VALUES (@classregIDInput, @memberIDInput, @classIDinput, @registrationDateInput, @classTypeInput);




--Queries for Equipment
SELECT * FROM Equipment; 
DELETE FROM Equipment WHERE condition;



--Queries for Members
SELECT * FROM Members;
DELETE FROM Members WHERE condition;

