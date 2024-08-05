import express from 'express';
import validateBody from '../helpers/validateBody';
import {
  loginSchema,
  patchSchema,
  refreshTokenSchema,
  registerSchema,
  resendVerifyMessageSchema,
} from '../schemas/authSchemas';
import authControllers from '../controllers/authControllers';
import { authenticate } from '../middlewares/authenticate';
import upload from '../middlewares/upload';
import isEmptyBody from '../middlewares/isEmptyBody';

const authRouter = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user (Password length should be min - 8 symb, max - 16 symb)
 *
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

authRouter.post(
  '/register',
  validateBody(registerSchema),
  authControllers.registerUser
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */

authRouter.post('/login', validateBody(loginSchema), authControllers.loginUser);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout the current user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */

authRouter.post('/logout', authenticate, authControllers.logoutUser);

/**
 * @openapi
 * /api/auth/current:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get the current logged-in user's details
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

authRouter.get('/current', authenticate, authControllers.getCurrentUser);

/**
 * @openapi
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh user tokens
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *       400:
 *         description: Bad request
 */

authRouter.post(
  '/refresh',
  validateBody(refreshTokenSchema),
  authControllers.refreshTokens
);

/**
 * @openapi
 * /api/auth/update:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Update user information
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchUser'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

authRouter.patch(
  '/update',
  upload.single('avatar'),
  authenticate,
  isEmptyBody,
  validateBody(patchSchema),
  authControllers.patchUser
);

/**
 * @openapi
 * /api/auth/verify/{verificationToken}:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Verify a user's email with a verification token
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The verification token sent to the user
 *     responses:
 *       200:
 *         description: User email verified successfully
 *       400:
 *         description: Bad request
 */

authRouter.get('/verify/:verificationToken', authControllers.verifyUser);

/**
 * @openapi
 * /api/auth/verify:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Resend verification message to a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendVerifyMessage'
 *     responses:
 *       200:
 *         description: Verification message sent successfully
 *       400:
 *         description: Bad request
 */

authRouter.post(
  '/verify',
  validateBody(resendVerifyMessageSchema),
  authControllers.resendVerifyMessage
);

export default authRouter;
