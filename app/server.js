const express = require('express');
const app = express();
const port = 3000; // You can choose any port number

app.get('/api/planets', (req, res) => {
  res.json([{ name: 'Earth' }, { name: 'Mars' }]); // Fake list of planets
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
