import express from 'express';
import router from './routes/router.ts';

// Importing module

const app = express();
const PORT: number = 3000;

// Server setup
app.listen(PORT, () => {
  console.log(
    'The application is listening ' + 'on port http://localhost:' + PORT
  );
});
app.get('/', router);
