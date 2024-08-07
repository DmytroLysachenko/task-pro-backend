import express from 'express';

import columnCtrl from '../controllers/columnControllers';

import isValidId from '../middlewares/isValidId';
import isEmptyBody from '../middlewares/isEmptyBody';
import { authenticate } from '../middlewares/authenticate';

import {
  createColumnSchema,
  updateColumnSchema,
} from '../schemas/columnSchemas';

import validateBody from '../helpers/validateBody';

const columnRouter = express.Router();

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
 * /api/boards/:boardId/columns:
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
 *         description: Column created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateColumnResponse'
 *       404:
 *         description: Board not found
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
 * /api/boards/:boardId/columns/:columnId:
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
 *         description: Column updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateColumnResponse'
 *       404:
 *         description: Column not found
 */

columnRouter.delete(
  '/boards/:boardId/columns/:columnId',
  authenticate,
  isValidId,
  columnCtrl.deleteColumn
);

/**
 * @openapi
 * /api/boards/:boardId/columns/:columnId:
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
 *         description: Column deleted successfully
 *       404:
 *         description: Column not found
 */

export default columnRouter;
