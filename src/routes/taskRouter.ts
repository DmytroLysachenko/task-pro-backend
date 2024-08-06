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

/**
 * @openapi
 * /api/tasks-management/boards/:boardId/columns/:columnId/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create new task in a column
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: columnId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskRequest'
 *       required: true
 *     responses:
 *       201:
 *         description: Task successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTaskResponse'
 *       404:
 *         description: Column not found
 */

taskRouter.patch(
  '/boards/:boardId/columns/:columnId/tasks/:taskId',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(updateTaskSchema),
  taskCtrl.updateTask
);

/**
 * @openapi
 * /api/tasks-management/boards/:boardId/columns/:columnId/tasks/:taskId:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Update task in a column
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: columnId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskRequest'
 *       required: true
 *     responses:
 *       201:
 *         description: Task successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateTaskResponse'
 *       404:
 *         description: Column not found
 */

taskRouter.delete(
  '/boards/:boardId/columns/:columnId/tasks/:taskId',
  authenticate,
  isValidId,
  taskCtrl.deleteTask
);

/**
 * @openapi
 * /api/tasks-management/boards/:boardId/columns/:columnId/tasks/:taskId:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete task from a column
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: boardId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: columnId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "64d5f7d1c2d1e8d4d8c9b5a2"
 *     responses:
 *       204:
 *         description: Task successfully deleted
 *       404:
 *         description: Task not found
 */

export default taskRouter;
