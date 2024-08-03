import { Router } from 'express';
import boardController from '../controllers/boardControllers';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/board', authenticate, boardController.getBoards);
router.post('/board', authenticate, boardController.createBoard);
router.patch('/board/:boardid', authenticate, boardController.updateBoard);
router.delete('/board/:boardid', authenticate, boardController.deleteBoard);

export default router;
