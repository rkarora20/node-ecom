const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use env PORT or 3000

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My E-Commerce Site</h1>
    <ul>
      <li>🧥 Jacket - $59 <button>Buy</button></li>
      <li>📱 Phone - $699 <button>Buy</button></li>
    </ul>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`E-commerce app listening on port ${port}`);
});

