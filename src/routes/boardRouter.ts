import { Router } from 'express';

import boardController from '../controllers/boardControllers';

import { authenticate } from '../middlewares/authenticate';
import { backgroundConvert } from '../middlewares/backgroundConvert';

import { boardSchema, boardUpdateSchema } from '../schemas/boardSchema';

import validateBody from '../helpers/validateBody';

const router = Router();

router.get('/boards', authenticate, boardController.getBoards);

/**
 * @openapi
 * /api/boards:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Retrieve a list of boards
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SideBoard'
 *       401:
 *         description: Unauthorized
 */

router.get('/boards/:boardId', authenticate, boardController.getBoard);

/**
 * @openapi
 * /api/boards/:boardId:
 *   get:
 *     tags:
 *       - Boards
 *     summary: Retrieve a board by Board ID
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Board'
 *       401:
 *         description: Unauthorized
 */

router.post(
  '/boards',
  validateBody(boardSchema),
  authenticate,
  backgroundConvert,
  boardController.createBoard
);

/**
 * @openapi
 * /api/boards:
 *   post:
 *     tags:
 *       - Boards
 *     summary: Create a new board
 *     requestBody:
 *       description: Background image should be in format 'image_1' with number from 1 to 15. Order of backgrounds as per figma mark-up
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardCreation'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

router.patch(
  '/boards/:boardId',
  validateBody(boardUpdateSchema),
  authenticate,
  backgroundConvert,
  boardController.updateBoard
);

/**
 * @openapi
 * /api/boards/:boardId:
 *   patch:
 *     tags:
 *       - Boards
 *     summary: Update an existing board
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardUpdate'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Board updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board not found
 */

router.delete('/boards/:boardId', authenticate, boardController.deleteBoard);

/**
 * @openapi
 * /api/boards/:boardId:
 *   delete:
 *     tags:
 *       - Boards
 *     summary: Delete a board
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the board to delete
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Board deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board not found
 */

export default router;
