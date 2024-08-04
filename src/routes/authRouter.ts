import express from 'express';
import validateBody from '../helpers/validateBody';
import {
  loginSchema,
  patchSchema,
  registerSchema,
  resendVerifyMessageSchema,
} from '../schemas/authSchemas';
import authControllers from '../controllers/authControllers';
import { authenticate } from '../middlewares/authenticate';
import upload from '../middlewares/upload';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  authControllers.registerUser
);

authRouter.post('/login', validateBody(loginSchema), authControllers.loginUser);

authRouter.post('/logout', authenticate, authControllers.logoutUser);

authRouter.get('/current', authenticate, authControllers.getCurrentUser);

authRouter.patch(
  '/update',
  upload.single('avatar'),
  authenticate,
  validateBody(patchSchema),
  authControllers.patchUser
);

authRouter.get('/verify/:verificationToken', authControllers.verifyUser);

authRouter.post(
  '/verify',
  validateBody(resendVerifyMessageSchema),
  authControllers.resendVerifyMessage
);

export default authRouter;
