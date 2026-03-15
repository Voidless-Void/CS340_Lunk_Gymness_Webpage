/* # Citation for use of AI Tools:
      # Date: 2/23/2025
      # Prompt used to help generate this file:
      # Create a very basic and bare bones Handlebars template for a gym database that displays the following tables: 
      # - Classes (classID, className, scheduleTime, roomNumber, capacity, trainerID, equipmentID)
      # - Trainers (trainerID, firstName, lastName, biography)
      # - Equipment (equipmentID, equipmentName, category, condition, maintenanceDate)
      # - Members (memberID, firstName, lastName, email, phone, membershipType, joinDate)
      # - classregistrations (classRegID, memberID, classID, registrationDate, classType)
      #  Each table should have a browse.hbs file that displays all records in a table format with an "Add New" button and "Edit" and "Delete" buttons for each record. 
      #  The "Delete" button should have a confirmation prompt. The "Add New" button should link to an add form, and the "Edit" button should link to an edit form for that specific entry.
      #  AI Source URL: https://code.visualstudio.com/docs/copilot/overview. Links to an external site.  
      #  The functions below were written by this ai prompt, unless stated otherwise in the comments above each function.
      # 
      # Additionally, 
      # Utilized VSCODE Github Copilot AI-powered autocompletion to assist in writing the procedure code. No prompts were used. 
      # The overall structure and logic of the procedures were written by Carter Deal and Samuel Dressel.
      # Source: https://code.visualstudio.com/docs/copilot/ai-powered-suggestions. Links to an external site.  
      # 
*/


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
    equipment.forEach(item => {
      if (item.maintenanceDate instanceof Date) {
        item.maintenanceDate = item.maintenanceDate.toISOString().split('T')[0];
      }
    });
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

    const equip = equipment[0];
    if (equip && equip.maintenanceDate instanceof Date) {
      equip.maintenanceDate = equip.maintenanceDate.toISOString().split('T')[0];
    }

    res.render('equipment/edit', { equipment: equip });
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
// Originality: This function was generated by the ai prompt given at the top of this file, but the query was written by Carter Deal and Samuel Dressel.
app.get('/classregistrations', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classRegistrations] = await connection.query(`
      SELECT cr.classRegID, 
             CONCAT(m.firstName, ' ', m.lastName) AS memberName, 
             c.className, 
             cr.registrationDate, 
             cr.classType
      FROM ClassRegistrations cr
      JOIN Members m ON cr.memberID = m.memberID
      JOIN Classes c ON cr.classID = c.classID
    `);
    connection.release();
    classRegistrations.forEach(reg => {
      if (reg.registrationDate instanceof Date) {
        reg.registrationDate = reg.registrationDate.toISOString().split('T')[0];
      }
    });
    res.render('classregistrations/browse', { classRegistrations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving class registrations');
  }
});

// render the add page for Class Registrations
// Originality: This function was generated by the ai prompt given at the top of this file, but the query was written by Carter Deal and Samuel Dressel.
app.get('/classregistrations/add', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [members] = await connection.query('SELECT memberID, CONCAT(firstName, " ", lastName) AS name FROM Members');
    const [classes] = await connection.query('SELECT classID, className, scheduleTime FROM Classes');
    connection.release();
    classes.forEach(cls => {
      if (cls.scheduleTime instanceof Date) {
        const dateStr = cls.scheduleTime.toISOString().split('T')[0];
        const timeStr = cls.scheduleTime.toTimeString().slice(0,5);
        cls.scheduleTime = `${dateStr} at ${timeStr}`;
      }
    });
    res.render('classregistrations/add', { members, classes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading add form');
  }
});

// edit page for Class Registrations
// Originality: This function was generated by the ai prompt given at the top of this file, but the query was written by Carter Deal and Samuel Dressel.
app.get('/classregistrations/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [registrations] = await connection.query('SELECT * FROM ClassRegistrations WHERE classRegID = ?', [req.params.id]);
    const [members] = await connection.query('SELECT memberID, CONCAT(firstName, " ", lastName) AS name FROM Members');
    const [classes] = await connection.query('SELECT classID, className, scheduleTime FROM Classes');
    connection.release();

    const registration = registrations[0];
    if (registration.registrationDate instanceof Date) {
        registration.registrationDate = registration.registrationDate.toISOString().split('T')[0];
    }

    classes.forEach(cls => {
      if (cls.scheduleTime instanceof Date) {
        const dateStr = cls.scheduleTime.toISOString().split('T')[0];
        const timeStr = cls.scheduleTime.toTimeString().slice(0,5);
        cls.scheduleTime = `${dateStr} at ${timeStr}`;
      }
    });

    res.render('classregistrations/edit', { registration, members, classes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving class registration');
  }
});

//Classes
// Originality: This function was generated by the ai prompt given at the top of this file, but the query was written by Carter Deal and Samuel Dressel.
app.get('/classes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query(`
      SELECT c.classID, c.className, c.scheduleTime, c.roomNumber, c.capacity,
             CONCAT(t.firstName, ' ', t.lastName) AS trainerName,
             e.equipmentName
      FROM Classes c
      JOIN Trainers t ON c.trainerID = t.trainerID
      JOIN Equipment e ON c.equipmentID = e.equipmentID
    `);
    connection.release();
    classes.forEach(cls => {
      if (cls.scheduleTime instanceof Date) {
        const dateStr = cls.scheduleTime.toISOString().split('T')[0];
        const timeStr = cls.scheduleTime.toTimeString().slice(0,5);
        cls.scheduleTime = `${dateStr} at ${timeStr}`;
      }
    });
    res.render('classes/browse', { classes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving classes');
  }
});

// render the add page for Classes
// Originality: This function was generated by the ai prompt given at the top of this file, but the trainers query was written by Carter Deal and Samuel Dressel.
app.get('/classes/add', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [trainers] = await connection.query('SELECT trainerID, CONCAT(firstName, " ", lastName) AS name FROM Trainers');
    const [equipment] = await connection.query('SELECT equipmentID, equipmentName FROM Equipment');
    connection.release();
    res.render('classes/add', { trainers, equipment });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading add form');
  }
});

// edit page for Classes
// Originality: This function was generated by the ai prompt given at the top of this file, but the trainers query was written by Carter Deal and Samuel Dressel.
app.get('/classes/edit/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query('SELECT * FROM Classes WHERE classID = ?', [req.params.id]);
    const [trainers] = await connection.query('SELECT trainerID, CONCAT(firstName, " ", lastName) AS name FROM Trainers');
    const [equipment] = await connection.query('SELECT equipmentID, equipmentName FROM Equipment');

    const cls = classes[0];
    if (cls && cls.scheduleTime instanceof Date) {
      cls.scheduleTime = cls.scheduleTime.toISOString().slice(0,16);
    }

    connection.release();
    res.render('classes/edit', { class: cls, trainers, equipment });
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
    members.forEach(member => {
      if (member.joinDate instanceof Date) {
        member.joinDate = member.joinDate.toISOString().split('T')[0];
      }
    });
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


/////////////////////////////////////////////////////////////// 
// The functions below were originally written by Carter Deal and Samuel Dressel, although they were inspired by the generated code above.

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
  } catch (error) {
    console.error(error);
    res.status(500).send('Error resetting database');
  }
});

// Edit entry for any table
app.post('/edit/:table/:id', async (req, res) => {
  try {
    console.log('Edit request body:', req.body);
    const connection = await pool.getConnection();
    const data = JSON.stringify(req.body);
    await connection.query('CALL EditEntry(?, ?, ?)', [req.params.id, req.params.table, data]);
    connection.release();
    res.redirect('/' + req.params.table);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error editing entry');
  }
});

// Add entry for any table
app.post('/add/:table', async (req, res) => {
  try {
    console.log('Add request body:', req.body);
    const connection = await pool.getConnection();
    const data = JSON.stringify(req.body);
    await connection.query('CALL AddEntry(?, ?)', [req.params.table, data]);
    connection.release();
    res.redirect('/' + req.params.table);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding entry');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});