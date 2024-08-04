import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { env } from './helpers/env';
import authRouter from './routes/authRouter';
import columnRouter from './routes/columnRouter';
import boardRouter from './routes/boardRouter';

dotenv.config();
// Server setup

const startServer = async () => {
  const PORT = env('PORT');
  const app = express();

  app.use(morgan('tiny'));
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRouter);

  app.use('/api/boards-management', boardRouter);

  app.use('/api/columns-management', columnRouter);

  // app.use('/api/tasks-management', taskRouter); inside task router ==> /boards/:boardId/columns/:columnId/tasks

  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });
};

export default startServer;

// dmytro - RGih9kttVPr8OsXj
// mongodb+srv://dmytro:RGih9kttVPr8OsXj@project-cluster.9biwlje.mongodb.net/task-pro-db?retryWrites=true&w=majority&appName=Project-cluster

//tymur - wc6Lk5KfOhWcofmt
