import { Router } from 'express';
import boardController from '../controllers/boardControllers';
import { authenticate } from '../middlewares/authenticate';
import validateBody from '../helpers/validateBody';
import { boardSchema, boardUpdateSchema } from '../schemas/boardSchema';

const router = Router();

router.get('/board', authenticate, boardController.getBoards);
router.post(
  '/board',
  validateBody(boardSchema),
  authenticate,
  boardController.createBoard
);
router.patch(
  '/board/:boardid',
  validateBody(boardUpdateSchema),
  authenticate,
  boardController.updateBoard
);
router.delete('/board/:boardid', authenticate, boardController.deleteBoard);

export default router;
