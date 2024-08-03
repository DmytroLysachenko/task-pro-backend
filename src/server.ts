import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { env } from './helpers/env';
import authRouter from './routes/authRouter';

dotenv.config();
// Server setup

const startServer = async () => {
  const PORT = env('PORT');

  const app = express();

  app.use(morgan('tiny'));

  app.use(cors());

  app.use(express.json());

  app.use('/auth', authRouter);
  //  app.use('/board', boardRouter);   app.post('/:id', postBoardController)
  //  app.use('/column', columnRouter);
  //  app.use('/task', taskRouter);

  app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });
};

export default startServer;

// dmytro - RGih9kttVPr8OsXj
// mongodb+srv://dmytro:RGih9kttVPr8OsXj@project-cluster.9biwlje.mongodb.net/task-pro-db?retryWrites=true&w=majority&appName=Project-cluster
//tymur - wc6Lk5KfOhWcofmt

//vitalii-
