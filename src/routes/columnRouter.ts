import express from 'express';

import columnCtrl from '../controllers/columnControllers';

const columnRouter = express.Router();

columnRouter.post('/', columnCtrl.addColumn);

columnRouter.patch('/:columnId', columnCtrl.editColumn);

columnRouter.delete('/:columnId', columnCtrl.deleteColumn);

export default columnRouter;
