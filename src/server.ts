import morgan from 'morgan';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { env } from './helpers/env';
import authRouter from './routes/authRouter';
import columnRouter from './routes/columnRouter';
import boardRouter from './routes/boardRouter';
import HttpError from './helpers/HttpError';
import path from 'node:path';
import swaggerSpec from './helpers/swagger';
import swaggerUi from 'swagger-ui-express';
import taskRouter from './routes/taskRouter';

const publicDirPath = path.resolve('src', 'public');
dotenv.config();
// Server setup

const startServer = async () => {
  const PORT = env('PORT');
  const app = express();

  app.use(express.static(publicDirPath));
  app.use(morgan('tiny'));
  app.use(cors());
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api/auth', authRouter);

  app.use('/api/boards-management', boardRouter);

  app.use('/api/columns-management', columnRouter);

  app.use('/api/tasks-management', taskRouter);

  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.log(err);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  });

  app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });
};

export default startServer;

// dmytro - RGih9kttVPr8OsXj
// mongodb+srv://dmytro:RGih9kttVPr8OsXj@project-cluster.9biwlje.mongodb.net/task-pro-db?retryWrites=true&w=majority&appName=Project-cluster

//tymur - wc6Lk5KfOhWcofmt
