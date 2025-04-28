const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// MySQL RDS connection
const connection = mysql.createConnection({
  host: 'ecom-db.cpwqq8k0u00o.ca-central-1.rds.amazonaws.com',  // <-- Replace with your actual RDS endpoint!
  user: 'admin',
  password: 'password1234',
});

// Connect to database
connection.connect(error => {
  if (error) {
    console.error('Database connection failed: ' + error.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Main route
app.get('/', (req, res) => {
  connection.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('<h1>Database connection failed 💥</h1>');
    } else {
      res.send(`
        <h1>Welcome to My E-Commerce Site (DB Connected ✅)</h1>
        <ul>
          <li>🧥 Jacket - $59 <button>Buy</button></li>
          <li>📱 Phone - $699 <button>Buy</button></li>
        </ul>
      `);
    }
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`E-commerce app listening on port ${port}`);
});

