import { Router } from 'express';
import boardController from '../controllers/boardControllers';
import { authenticate } from '../middlewares/authenticate';
import validateBody from '../helpers/validateBody';
import { boardSchema, boardUpdateSchema } from '../schemas/boardSchema';
import { backgroundConvert } from '../middlewares/backgroundConvert';

const router = Router();

router.get('/', authenticate, boardController.getBoards);
router.post(
  '/',
  validateBody(boardSchema),
  authenticate,
  backgroundConvert,
  boardController.createBoard
);
router.patch(
  '/:boardId',
  validateBody(boardUpdateSchema),
  authenticate,
  backgroundConvert,
  boardController.updateBoard
);
router.delete('/:boardId', authenticate, boardController.deleteBoard);

export default router;
