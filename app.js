const express = require('express');
const app = express();

const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'ecom-db.cpwqq8k0u00o.ca-central-1.rds.amazonaws.com', // <-- Your real RDS endpoint here
  user: 'admin',
  password: 'password1234',
  database: 'ecomdb' // (if database exists — we can create one if needed)
});

// Connect to the database
connection.connect(error => {
  if (error) {
    console.error('Database connection failed: ' + error.stack);
    return;
  }
  console.log('Connected to the database.');
});


const port = process.env.PORT || 3000; // Use env PORT or 3000

app.get('/', (req, res) => {
  connection.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).send('Database connection failed.');
    } else {
      res.send(`
        <h1>Welcome to My E-Commerce Site (DB Connected)</h1>
        <ul>
          <li>🧥 Jacket - $59 <button>Buy</button></li>
          <li>📱 Phone - $699 <button>Buy</button></li>
        </ul>
      `);
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`E-commerce app listening on port ${port}`);
});

