import express from 'express';

import validateBody from '../helpers/validateBody';
import taskCtrl from '../controllers/taskControllers';
import isEmptyBody from '../middlewares/isEmptyBody';
import isValidId from '../middlewares/isValidId';
import { authenticate } from '../middlewares/authenticate';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchemas';

const taskRouter = express.Router();

taskRouter.post(
  '/boards/:boardId/columns/:columnId/tasks',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(createTaskSchema),
  taskCtrl.createTask
);

taskRouter.patch(
  '/boards/:boardId/columns/:columnId/tasks/:taskId',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(updateTaskSchema),
  taskCtrl.updateTask
);

taskRouter.delete(
  '/boards/:boardId/columns/:columnId/tasks/:taskId',
  authenticate,
  isValidId,
  taskCtrl.deleteTask
);

export default taskRouter;
