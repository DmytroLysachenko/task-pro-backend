import express from 'express';

import isEmptyBody from '../middlewares/isEmptyBody';
import { authenticate } from '../middlewares/authenticate';
import { createSupportRequestSchema } from '../schemas/supportSchemas';
import validateBody from '../helpers/validateBody';
import supportCtrl from '../controllers/supportControllers';

const supportRouter = express.Router();

supportRouter.post(
  '/',
  authenticate,
  isEmptyBody,
  validateBody(createSupportRequestSchema),
  supportCtrl.createRequest
);

export default supportRouter;
