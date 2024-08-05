import express from 'express';

import columnCtrl from '../controllers/columnControllers';
import validateBody from '../helpers/validateBody';
import isEmptyBody from '../middlewares/isEmptyBody';
import isValidId from '../middlewares/isValidId';
import { authenticate } from '../middlewares/authenticate';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../schemas/columnSchemas';

const columnRouter = express.Router();

columnRouter.post(
  '/boards/:boardId/columns',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(createColumnSchema),
  columnCtrl.createColumn
);

columnRouter.patch(
  '/boards/:boardId/columns/:id',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(updateColumnSchema),

  columnCtrl.updateColumn
);

columnRouter.delete(
  '/boards/:boardId/columns/:id',
  authenticate,
  isValidId,
  columnCtrl.deleteColumn
);

export default columnRouter;
