const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup Handlebars
app.engine('hbs', exphbs.engine({ 
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Password',
  database: process.env.DB_NAME || 'LunkGymness',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes

// Index page
app.get('/', (req, res) => {
  res.render('index');
});

// Equipment Routes
app.get('/equipment', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [equipment] = await connection.query('SELECT * FROM Equipment');
    connection.release();
    res.render('equipment/browse', { equipment });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving equipment');
  }
});

app.get('/equipment/add', (req, res) => {
  res.render('equipment/add');
});

app.post('/equipment', async (req, res) => {
  try {
    const { equipmentName, category, condition, maintenanceDate } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO Equipment (equipmentName, category, `condition`, maintenanceDate) VALUES (?, ?, ?, ?)",
      [equipmentName, category, condition, maintenanceDate || null]
    );
    connection.release();
    res.redirect('/equipment');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding equipment');
  }
});

app.get('/equipment/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [equipment] = await connection.query('SELECT * FROM Equipment WHERE equipmentID = ?', [req.params.id]);
    connection.release();
    res.render('equipment/edit', { equipment: equipment[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving equipment');
  }
});

app.post('/equipment/edit/:id', async (req, res) => {
  try {
    const { equipmentName, category, condition, maintenanceDate } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE Equipment SET equipmentName = ?, category = ?, `condition` = ?, maintenanceDate = ? WHERE equipmentID = ?',
      [equipmentName, category, condition, maintenanceDate || null, req.params.id]
    );
    connection.release();
    res.redirect('/equipment');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating equipment');
  }
});

app.post('/equipment/delete/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM Equipment WHERE equipmentID = ?', [req.params.id]);
    connection.release();
    res.redirect('/equipment');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting equipment');
  }
});

// Trainers Routes
app.get('/trainers', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [trainers] = await connection.query('SELECT * FROM Trainers');
    connection.release();
    res.render('trainers/browse', { trainers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving trainers');
  }
});

app.get('/trainers/add', (req, res) => {
  res.render('trainers/add');
});

app.post('/trainers', async (req, res) => {
  try {
    const { firstName, lastName, specialty } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Trainers (firstName, lastName, specialty) VALUES (?, ?, ?)',
      [firstName, lastName, specialty]
    );
    connection.release();
    res.redirect('/trainers');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding trainer');
  }
});

app.get('/trainers/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [trainers] = await connection.query('SELECT * FROM Trainers WHERE trainerID = ?', [req.params.id]);
    connection.release();
    res.render('trainers/edit', { trainer: trainers[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving trainer');
  }
});

app.post('/trainers/edit/:id', async (req, res) => {
  try {
    const { firstName, lastName, specialty } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE Trainers SET firstName = ?, lastName = ?, specialty = ? WHERE trainerID = ?',
      [firstName, lastName, specialty, req.params.id]
    );
    connection.release();
    res.redirect('/trainers');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating trainer');
  }
});

app.post('/trainers/delete/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM Trainers WHERE trainerID = ?', [req.params.id]);
    connection.release();
    res.redirect('/trainers');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting trainer');
  }
});

//Class Registration routes
app.get('/classregistrations', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classRegistrations] = await connection.query('SELECT * FROM ClassRegistrations');
    connection.release();
    res.render('classregistrations/browse', { classRegistrations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving class registrations');
  }
});

app.get('/classregistrations/add', (req, res) => {
  res.render('classregistrations/add');
});

app.post('/classregistrations', async (req, res) => {
  try {
    const { memberID, classID, registrationDate, classType } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO ClassRegistrations (memberID, classID, registrationDate, classType) VALUES (?, ?, ?, ?)',
      [memberID, classID, registrationDate, classType]
    );
    connection.release();
    res.redirect('/classregistrations');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding class registration');
  }
});

app.get('/classregistrations/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [registrations] = await connection.query(
      'SELECT * FROM ClassRegistrations WHERE classregID = ?', 
      [req.params.id]
    );
    connection.release();

    const registration = registrations[0];
    if (registration.registrationDate instanceof Date) {
        registration.registrationDate = registration.registrationDate.toISOString().split('T')[0];
    }

    res.render('classregistrations/edit', { registration });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving class registration');
  }
});

app.post('/classregistrations/edit/:id', async (req, res) => {
  try {
    const { memberID, classID, registrationDate, classType } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE ClassRegistrations SET memberID = ?, classID = ?, registrationDate = ?, classType = ? WHERE classregID = ?',
      [memberID, classID, registrationDate, classType, req.params.id]
    );
    connection.release();
    res.redirect('/classregistrations');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating class registration');
  }
});

app.post('/classregistrations/delete/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM ClassRegistrations WHERE classregID = ?', [req.params.id]);
    connection.release();
    res.redirect('/classregistrations');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting class registration');
  }
});

//Class Routes
app.get('/classes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query('SELECT * FROM Classes');
    connection.release();
    res.render('classes/browse', { classes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving classes');
  }
});

app.get('/classes/add', (req, res) => {
  res.render('classes/add');
});

app.post('/classes', async (req, res) => {
  try {
    const { classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID]
    );
    connection.release();
    res.redirect('/classes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding class');
  }
});

app.get('/classes/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query('SELECT * FROM Classes WHERE classID = ?', [req.params.id]);
    connection.release();

    const classData = classes[0];
    if (classData.scheduleTime instanceof Date) {
        classData.scheduleTime = classData.scheduleTime.toISOString().slice(0, 16);
    }

    res.render('classes/edit', { class: classData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving class');
  }
});

app.post('/classes/edit/:id', async (req, res) => {
  try {
    const { className, scheduleTime, roomNumber, capacity, trainerID, equipmentID } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE Classes SET className = ?, scheduleTime = ?, roomNumber = ?, capacity = ?, trainerID = ?, equipmentID = ? WHERE classID = ?',
      [className, scheduleTime, roomNumber, capacity, trainerID, equipmentID, req.params.id]
    );
    connection.release();
    res.redirect('/classes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating class');
  }
});

app.post('/classes/delete/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM Classes WHERE classID = ?', [req.params.id]);
    connection.release();
    res.redirect('/classes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting class');
  }
});


//Members route
app.get('/members', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [members] = await connection.query('SELECT * FROM Members');
    connection.release();
    res.render('members/browse', { members });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving members');
  }
});

app.get('/members/add', (req, res) => {
  res.render('members/add');
});

app.post('/members', async (req, res) => {
  try {
    const { memberID, firstName, lastName, email, phone, membershipType, joinDate } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO Members (memberID, firstName, lastName, email, phone, membershipType, joinDate) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [memberID, firstName, lastName, email, phone, membershipType, joinDate]
    );
    connection.release();
    res.redirect('/members');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding member');
  }
});

app.get('/members/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [members] = await connection.query('SELECT * FROM Members WHERE memberID = ?', [req.params.id]);
    connection.release();

    const member = members[0];
    if (member.joinDate instanceof Date) {
        member.joinDate = member.joinDate.toISOString().split('T')[0];
    }

    res.render('members/edit', { member });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving member');
  }
});

app.post('/members/edit/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, membershipType, joinDate } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE Members SET firstName = ?, lastName = ?, email = ?, phone = ?, membershipType = ?, joinDate = ? WHERE memberID = ?',
      [firstName, lastName, email, phone, membershipType, joinDate, req.params.id]
    );
    connection.release();
    res.redirect('/members');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating member');
  }
});

app.post('/members/delete/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM Members WHERE memberID = ?', [req.params.id]);
    connection.release();
    res.redirect('/members');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting member');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

