import { router } from './routes/router.js';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// Server setup
const startServer = async () => {
    const PORT = 3000;
    //  await initMongoDBConnection();
    const app = express();
    app.use(morgan('tiny'));
    app.use(cors());
    app.use(express.json());
    //  app.use('/auth', authRouter);
    //  app.use('/board', boardRouter);   app.post('/:id', postBoardController)
    //  app.use('/column', columnRouter);
    //  app.use('/task', taskRouter);
    app.listen(PORT, () => { });
    app.get('/', router);
};
startServer();
// dmytro - RGih9kttVPr8OsXj
// mongodb+srv://dmytro:RGih9kttVPr8OsXj@project-cluster.9biwlje.mongodb.net/
//tymur - wc6Lk5KfOhWcofmt
//vitalii-
