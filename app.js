const AWS = require('aws-sdk');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Setup AWS SDK
const secretsManager = new AWS.SecretsManager({
  region: 'ca-central-1'  // Replace with your region
});

let db;

// Fetch secret first
secretsManager.getSecretValue({ SecretId: 'rds/ecom/mysql' }, (err, data) => {
  if (err) {
    console.error('Unable to fetch RDS credentials:', err);
    process.exit(1);
  } else {
    const secret = JSON.parse(data.SecretString);

    // Now create DB connection using secret
    db = mysql.createConnection({
      host: 'your-db-endpoint.rds.amazonaws.com',
      user: secret.username,
      password: secret.password,
      database: 'ecomdb' // (optional - if database created)
    });

    db.connect(error => {
      if (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
      }
      console.log('Connected to RDS database!');
    });
  }
});

// Route
app.get('/', (req, res) => {
  if (!db) {
    return res.status(500).send('DB Connection not ready.');
  }
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).send('Database query failed.');
    } else {
      res.send('<h1>Welcome to Secure E-Commerce Site! ✅</h1>');
    }
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`E-commerce app listening on port ${port}`);
});

