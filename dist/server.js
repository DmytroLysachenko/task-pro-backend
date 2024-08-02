import { router } from './routes/router';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
const PORT = 3000;
// Server setup
const startServer = async () => {
    const app = express();
    app.use(morgan('tiny'));
    app.use(cors());
    app.listen(PORT, () => { });
    app.get('/', router);
};
startServer();
