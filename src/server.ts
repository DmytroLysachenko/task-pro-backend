import { router } from './routes/router';
// Importing module
import express from 'express';

const app = express();
const PORT: number = 3000;

// Server setup
app.listen(PORT, () => {
  console.log(
    'The application is listening ' + 'on port http://localhost:' + PORT
  );
  console.log('hello there');
  console.log('one more console');
});
app.get('/', router);
