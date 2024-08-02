import { router } from './routes/router';
import express from 'express';
// Importing module
const app = express();
const PORT = 3000;
// Server setup
app.listen(PORT, () => {
    console.log('The application is listening ' + 'on port http://localhost:' + PORT);
});
app.get('/', () => {
    console.log('Get request completed');
});
router;
