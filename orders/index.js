const express = require('express');
const app = express();
const port = 3000;

app.get('/orders', (req, res) => {
  res.json({ message: "Orders service is running successfully!" });
});

app.listen(port, () => {
  console.log(`Orders service listening on port ${port}`);
});
