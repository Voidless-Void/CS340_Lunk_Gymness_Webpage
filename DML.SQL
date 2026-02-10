--Queries for Trainers Table
SELECT * FROM Trainers;
DELETE FROM Trainers WHERE condition;
UPDATE Trainers SET trainerID = trainerID, firstName = firstName, lastName = lastName, specialty=specialty WHERE condition;
INSERT INTO Trainers (trainerID, firstName, lastName, specialty) VALUES (@trainerIDInput,@firstNameInput, @lastNameInput, @specialtyInput);
--Queries for Classes Table
SELECT * FROM Classes;
DELETE FROM Classes WHERE condition;


--Queries for ClassRegistrations
SELECT * FROM ClassRegistrations;
DELETE FROM ClassRegistrations;
--Queries for Equipment
SELECT * FROM Equipment; 
DELETE FROM Equipment WHERE condition;

--Queries for Members
SELECT * FROM Members;
DELETE FROM Members WHERE condition;

