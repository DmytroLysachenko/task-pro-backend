import cors from 'cors';
import path from 'node:path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import authRouter from './routes/authRouter';
import taskRouter from './routes/taskRouter';
import boardRouter from './routes/boardRouter';
import columnRouter from './routes/columnRouter';
import supportRouter from './routes/supportRouter';

import { env } from './helpers/env';
import HttpError from './helpers/HttpError';
import swaggerSpec from './helpers/swagger';

import { NextFunction, Request, Response } from 'express';

const publicDirPath = path.resolve('src', 'public');

dotenv.config();

const startServer = async () => {
  const PORT = env('PORT');
  const app = express();

  app.use(express.static(publicDirPath));
  app.use(morgan('tiny'));
  app.use(cors());
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api/auth', authRouter);

  app.use('/api', taskRouter);

  app.use('/api', columnRouter);

  app.use('/api', boardRouter);

  app.use('/api/support', supportRouter);

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
