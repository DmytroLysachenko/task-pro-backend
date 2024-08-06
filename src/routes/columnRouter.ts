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

/**
 * @openapi
 * /api/boards/{boardId}/columns:
 *   post:
 *     tags:
 *       - Columns
 *     summary: Create a new column in a board
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateColumnRequest'
 *       required: true
 *     responses:
 *       201:
 *         description: Column successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateColumnResponse'
 *       404:
 *         description: Board not found
 */

columnRouter.post(
  '/boards/:boardId/columns',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(createColumnSchema),
  columnCtrl.createColumn
);

/**
 * @openapi
 * /api/boards/{boardId}/columns/{id}:
 *   patch:
 *     tags:
 *       - Columns
 *     summary: Update a column in a board
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateColumnRequest'
 *       required: true
 *     responses:
 *       200:
 *         description: Column successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateColumnResponse'
 *       404:
 *         description: Column not found
 */

columnRouter.patch(
  '/boards/:boardId/columns/:columnId',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(updateColumnSchema),
  columnCtrl.updateColumn
);

/**
 * @openapi
 * /api/boards/{boardId}/columns/{id}:
 *   delete:
 *     tags:
 *       - Columns
 *     summary: Delete a column from a board
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *     responses:
 *       204:
 *         description: Column successfully deleted
 *       404:
 *         description: Column not found
 */

columnRouter.delete(
  '/boards/:boardId/columns/:columnId',
  authenticate,
  isValidId,
  columnCtrl.deleteColumn
);

export default columnRouter;
