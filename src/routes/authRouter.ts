import express from 'express';
import validateBody from '../helpers/validateBody';
import {
  loginSchema,
  patchSchema,
  registerSchema,
} from '../schemas/authSchemas';
import authControllers from '../controllers/authControllers';
import { authenticate } from '../middlewares/authenticate';

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
  authenticate,
  validateBody(patchSchema),
  authControllers.patchUser
);

// authRouter.patch(
//   '/avatar',
//   upload.single('avatar'),
//   authenticate,
//   patchAvatarUser
// );

authRouter.get('/verify/:verificationToken', authControllers.verifyUser);

// authRouter.post(
//   '/verify',
//   validateBody(resendVerifyMessageSchema),
//   resendVerifyMessage
// );

export default authRouter;
