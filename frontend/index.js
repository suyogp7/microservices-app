const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Microservices Frontend Application!</h1>');
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});
