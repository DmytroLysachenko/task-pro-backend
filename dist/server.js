import { router } from './routes/router';
// Importing module
import express from 'express';
const app = express();
const PORT = 3000;
// Server setup
app.listen(PORT, () => {
  console.log(
    'The application is listening ' + 'on port http://localhost:' + PORT
  );
});
app.get('/', router);
