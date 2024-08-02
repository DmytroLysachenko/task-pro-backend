// Importing module
const express = require('express');

const app = express();
const PORT: number = 3000;

// Server setup
app.listen(PORT, () => {
  console.log(
    'The application is listening ' + 'on port http://localhost:' + PORT
  );
});
app.get('/', () => {
  console.log('Get request completed');
});
