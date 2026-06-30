const express = require('express');
const app = express();
const port = 3001;

app.get('/payments', (req, res) => {
  res.json({ message: "Payments service is running!" });
});

app.listen(port, () => {
  console.log(`Payments service listening on port ${port}`);
});
