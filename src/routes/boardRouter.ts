import { Router } from 'express';
import boardController from '../controllers/boardControllers';
import { authenticate } from '../middlewares/authenticate';
import validateBody from '../helpers/validateBody';
import { boardSchema, boardUpdateSchema } from '../schemas/boardSchema';

const router = Router();

router.get('/', authenticate, boardController.getBoards);
router.post(
  '/',
  validateBody(boardSchema),
  authenticate,
  boardController.createBoard
);
router.patch(
  '/:boardid',
  validateBody(boardUpdateSchema),
  authenticate,
  boardController.updateBoard
);
router.delete('/:boardid', authenticate, boardController.deleteBoard);

export default router;
