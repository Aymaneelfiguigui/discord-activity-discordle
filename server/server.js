const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Basic route to check that the server is running
app.get('/', (req, res) => {
  res.send('Discord Wordle Backend is up and running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
