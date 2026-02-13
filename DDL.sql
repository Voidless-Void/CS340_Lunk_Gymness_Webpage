-- Lunk Gymness Management System Database
-- CS340 Database Course
-- Created by: Carter Deal and Samuel Dressel

-- Create database
CREATE DATABASE IF NOT EXISTS LunkGymness;
USE LunkGymness;

-- =====================================================
-- Table: Equipment
-- Purpose: Maintains an inventory of equipment and its condition for scheduling and maintenance
-- =====================================================
CREATE TABLE Equipment (
  equipmentID INT NOT NULL AUTO_INCREMENT,
  equipmentName VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  `condition` VARCHAR(50) NOT NULL,
  maintenanceDate DATE NULL,
  PRIMARY KEY (equipmentID)
);

-- Insert sample equipment data
INSERT INTO Equipment (equipmentName, category, `condition`, maintenanceDate)
VALUES
  ('Yoga Mats', 'Flexibility', 'Good', '2024-04-10'),
  ('Treadmill', 'Cardio', 'Needs Repair', '2024-03-20'),
  ('Dumbbells Set', 'Strength', 'Good', '2024-04-15'),
  ('Rowing Machine', 'Cardio', 'Good', '2024-02-28');


-- =====================================================
-- Table: Members
-- Purpose: Stores personal and membership information for each gym member
-- =====================================================
CREATE TABLE Members (
  memberID INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  membershipType VARCHAR(20) NOT NULL,
  joinDate DATE NOT NULL,
  PRIMARY KEY (memberID)
);

-- Insert sample members data
INSERT INTO Members (firstName, lastName, email, phone, membershipType, joinDate)
VALUES
  ('Sarah', 'Kim', 'sarah.kim@example.com', '990-555-2011', 'Premium', '2024-01-15'),
  ('Jason', 'Patel', 'jason.patel@example.com', '991-555-8890', 'Basic', '2024-02-10'),
  ('Maria', 'Lopez', 'maria.lopez@example.com', '992-555-4421', 'Premium', '2024-03-05'),
  ('Daniel', 'Brooks', 'daniel.brooks@example.com', NULL, 'Basic', '2024-04-01');


-- =====================================================
-- Table: Trainers
-- Purpose: Tracks trainers who lead classes and their areas of expertise
-- =====================================================
CREATE TABLE Trainers (
  trainerID INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  specialty VARCHAR(50),
  PRIMARY KEY (trainerID)
);

-- Insert sample trainers data
INSERT INTO Trainers (firstName, lastName, specialty)
VALUES
  ('Emily', 'Chen', 'Yoga'),
  ('Marcus', 'Reed', 'Strength'),
  ('Olivia', 'Turner', 'Cardio');


-- =====================================================
-- Table: Classes
-- Purpose: Stores details about each class, including schedule and assigned trainer
-- =====================================================
CREATE TABLE Classes (
  classID INT NOT NULL AUTO_INCREMENT,
  className VARCHAR(100) NOT NULL,
  scheduleTime DATETIME NOT NULL,
  roomNumber VARCHAR(10),
  trainerID INT NOT NULL,
  capacity INT NOT NULL,
  equipmentID INT NOT NULL,
  PRIMARY KEY (classID),
  FOREIGN KEY (trainerID) REFERENCES Trainers (trainerID) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (equipmentID) REFERENCES Equipment (equipmentID) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Insert sample classes data
INSERT INTO Classes (className, scheduleTime, roomNumber, 
                      trainerID, capacity, equipmentID)
VALUES
  ('Morning Yoga', '2024-05-01 08:00:00', 'R101', 
    (SELECT trainerID FROM Trainers WHERE firstName = 'Emily' AND lastName = 'Chen'), 15, (SELECT equipmentID FROM Equipment WHERE equipmentName = 'Yoga Mats')),
  ('HIIT Blast', '2024-05-01 10:00:00', 'R202', 
    (SELECT trainerID FROM Trainers WHERE firstName = 'Olivia' AND lastName = 'Turner'), 12, (SELECT equipmentID FROM Equipment WHERE equipmentName = 'Treadmill')),
  ('Strength Training', '2024-05-02 09:30:00', 'R303', 
    (SELECT trainerID FROM Trainers WHERE firstName = 'Marcus' AND lastName = 'Reed'), 15, (SELECT equipmentID FROM Equipment WHERE equipmentName = 'Dumbbells Set')),
  ('Evening Yoga', '2024-05-02 18:00:00', 'R101', 
    (SELECT trainerID FROM Trainers WHERE firstName = 'Emily' AND lastName = 'Chen'), 15, (SELECT equipmentID FROM Equipment WHERE equipmentName = 'Yoga Mats'));


-- =====================================================
-- Table: ClassRegistrations
-- Purpose: Intersection table implementing the many-to-many relationship between Members and Classes
--          Tracks which members are registered for which classes
-- =====================================================
CREATE TABLE ClassRegistrations (
  classregID INT NOT NULL AUTO_INCREMENT,
  memberID INT NOT NULL,
  classID INT NOT NULL,
  registrationDate DATE NOT NULL,
  classType VARCHAR(50) NOT NULL,
  PRIMARY KEY (classregID),
  FOREIGN KEY (memberID) REFERENCES Members (memberID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (classID) REFERENCES Classes (classID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample class registrations data
INSERT INTO ClassRegistrations (memberID, classID, registrationDate, classType)
VALUES
  ((SELECT memberID FROM Members WHERE firstName = 'Sarah' AND lastName = 'Kim'), (SELECT classID FROM Classes WHERE className = 'Morning Yoga'), '2024-04-20', 'Yoga'),
  ((SELECT memberID FROM Members WHERE firstName = 'Jason' AND lastName = 'Patel'), (SELECT classID FROM Classes WHERE className = 'HIIT Blast'), '2024-04-22', 'Cardio'),
  ((SELECT memberID FROM Members WHERE firstName = 'Maria' AND lastName = 'Lopez'), (SELECT classID FROM Classes WHERE className = 'Strength Training'), '2024-04-25', 'Strength'),
  ((SELECT memberID FROM Members WHERE firstName = 'Sarah' AND lastName = 'Kim'), (SELECT classID FROM Classes WHERE className = 'Evening Yoga'), '2024-04-28', 'Yoga'),
  ((SELECT memberID FROM Members WHERE firstName = 'Daniel' AND lastName = 'Brooks'), (SELECT classID FROM Classes WHERE className = 'HIIT Blast'), '2024-04-30', 'Cardio');

