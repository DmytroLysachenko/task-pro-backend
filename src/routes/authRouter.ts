import express from 'express';
import validateBody from '../helpers/validateBody';
import { loginSchema, registerSchema } from '../schemas/authSchemas';
import authControllers from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  authControllers.registerUser
);

authRouter.post('/login', validateBody(loginSchema), authControllers.loginUser);

// authRouter.post('/logout', authenticate, logoutUser);

// authRouter.get('/current', authenticate, getCurrentUser);

// authRouter.patch(
//   '/subscription',
//   authenticate,
//   validateBody(updateUserSubscriptionSchema),
//   patchSubscriptionUser
// );

// authRouter.patch(
//   '/avatar',
//   upload.single('avatar'),
//   authenticate,
//   patchAvatarUser
// );

// authRouter.get('/verify/:verificationToken', verifyUser);

// authRouter.post(
//   '/verify',
//   validateBody(resendVerifyMessageSchema),
//   resendVerifyMessage
// );

export default authRouter;
