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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

