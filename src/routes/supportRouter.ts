import express from 'express';

import supportCtrl from '../controllers/supportControllers';

import isEmptyBody from '../middlewares/isEmptyBody';
import { authenticate } from '../middlewares/authenticate';

import { createSupportRequestSchema } from '../schemas/supportSchemas';

import validateBody from '../helpers/validateBody';

const supportRouter = express.Router();

supportRouter.post(
  '/',
  authenticate,
  isEmptyBody,
  validateBody(createSupportRequestSchema),
  supportCtrl.createRequest
);

/**
 * @openapi
 * /api/support:
 *   post:
 *     tags:
 *       - Support
 *     summary: Send support email
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sendSupportEmailRequest'
 *       required: true
 *     responses:
 *       200:
 *         description: Email send successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/sendSupportEmailResponse'
 */

export default supportRouter;
