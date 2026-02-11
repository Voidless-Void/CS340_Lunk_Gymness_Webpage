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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
