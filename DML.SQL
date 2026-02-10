--Queries for Trainers Table
SELECT * FROM Trainers;
DELETE FROM Trainers WHERE condition;
UPDATE Trainers SET trainerID = trainerID, firstName = firstName, lastName = lastName, specialty=specialty WHERE condition;
INSERT INTO Trainers (trainerID, firstName, lastName, specialty) VALUES (@trainerIDInput,@firstNameInput, @lastNameInput, @specialtyInput);

--Queries for Classes Table
SELECT * FROM Classes;
DELETE FROM Classes WHERE condition;
--These queries are for updating the foreign keys of trainerID and equipmentID in Classes Table
--After updating foreign keys other attributes in the class table will be updated
UPDATE Equipment SET equipmentID = equipmentID WHERE condition;
UPDATE Trainers SET trainerID = trainerID WHERE condition;
UPDATE Classes SET classID = classID, className = className, scheduleTime = scheduleTime, roomNumber = roomNumber, capacity = capacity WHERE condition;
--insert queries for classes
INSERT INTO Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID) VALUES (@classIDInput, @classNameInput, @scheduleTimeInput, @roomNumberInput, @capacityInput, @trainerIDInput, @equipmentIDInput);







--Queries for ClassRegistrations
SELECT * FROM ClassRegistrations;
DELETE FROM ClassRegistrations;
--Queries for Equipment
SELECT * FROM Equipment; 
DELETE FROM Equipment WHERE condition;

--Queries for Members
SELECT * FROM Members;
DELETE FROM Members WHERE condition;

