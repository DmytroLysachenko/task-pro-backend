import express from 'express';

import columnCtrl from '../controllers/columnControllers';

const columnRouter = express.Router();

columnRouter.post('/', columnCtrl.createColumn);

columnRouter.patch('/:id', columnCtrl.updateColumn);

columnRouter.delete('/:id', columnCtrl.deleteColumn);

export default columnRouter;
