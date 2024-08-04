import express from 'express';

import columnCtrl from '../controllers/columnControllers';
import { authenticate } from '../middlewares/authenticate';

const columnRouter = express.Router();

columnRouter.post(
  '/boards/:boardId/columns',
  authenticate,
  columnCtrl.createColumn
);

columnRouter.patch(
  '/boards/:boardId/columns/:id',
  authenticate,
  columnCtrl.updateColumn
);

columnRouter.delete(
  '/boards/:boardId/columns/:id',
  authenticate,
  columnCtrl.deleteColumn
);

export default columnRouter;
