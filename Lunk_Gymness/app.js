/* # Citation for use of AI Tools:
      # Date: 10/2/2025
      # Prompt used to help generate this file:
      # Create a very basic and bare bones Handlebars template for a gym database that displays the following tables: 
      # - Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID)
      # - Trainers (trainerID, firstName, lastName, specialty)
      # - Equipment (equipmentID, equipmentName, category, condition, maintenanceDate)
      # - Members (memberID, firstName, lastName, email, phone, membershipType, joinDate)
      # - classregistrations (regID, memberID, classID, registrationDate, classType)
      #  Each table should have a browse.hbs file that displays all records in a table format with an "Add New" button and "Edit" and "Delete" buttons for each record. 
      #  The "Delete" button should have a confirmation prompt. The "Add New" button should link to an add form, and the "Edit" button should link to an edit form for that specific entry.
      # AI Source URL: https://code.visualstudio.com/docs/copilot/overview
Links to an external site.  */


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Setup Handlebars
app.engine('hbs', exphbs.engine({ 
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    eq: function(a, b) {
      return a === b;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Bazinga13542%',
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

// Equipment
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

// render the add page for Equipment
app.get('/equipment/add', (req, res) => {
  res.render('equipment/add');
});

// edit page for Equipment
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

// Trainers
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

// render the add page for Trainers
app.get('/trainers/add', (req, res) => {
  res.render('trainers/add');
});

// edit page for Trainers
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

//Class Registrations
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

// render the add page for Class Registrations
app.get('/classregistrations/add', async (req, res) => {
  res.render('classregistrations/add');
});

// edit page for Class Registrations
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

//Classes
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

// render the add page for Classes
app.get('/classes/add', async (req, res) => {
  res.render('classes/add');
});

// edit page for Classes
app.get('/classes/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query('SELECT * FROM Classes WHERE classID = ?', [req.params.id]);
    connection.release();
    res.render('classes/edit', { class: classes[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving class');
  }
});

//Members
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

// render the add page for Members
app.get('/members/add', async (req, res) => {
  res.render('members/add');
});

// edit page for Members
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

// delete entry for any table
app.get('/delete/:table/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('CALL DeleteEntry(?, ?)', [req.params.id, req.params.table]);
    connection.release();
    res.redirect(req.get('Referrer') || '/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting entry');
  }
});

// Reset Database
app.get('/reset', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('CALL ResetDatabase()');
    connection.release();
    res.redirect(req.get('Referrer') || '/');
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error resetting database');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});