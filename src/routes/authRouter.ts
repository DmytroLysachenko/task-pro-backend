import express from 'express';

import authControllers from '../controllers/authControllers';

import upload from '../middlewares/upload';
import isEmptyBody from '../middlewares/isEmptyBody';
import { authenticate } from '../middlewares/authenticate';

import {
  loginSchema,
  patchSchema,
  refreshTokenSchema,
  registerSchema,
  resendVerifyMessageSchema,
} from '../schemas/authSchemas';

import validateBody from '../helpers/validateBody';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerSchema),
  authControllers.registerUser
);

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
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: 'User successfully registered'
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: 'newUser123'
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: 'newuser@example.com'
 *               required:
 *                 - status
 *                 - message
 *                 - data
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */

authRouter.post('/login', validateBody(loginSchema), authControllers.loginUser);

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
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: 'accessToken123'
 *                     refreshToken:
 *                       type: string
 *                       example: 'refreshToken123'
 *                     user:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: 'newUser123'
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: 'newuser@example.com'
 *                         avatarUrl:
 *                           type: string
 *                           format: uri
 *                           example: 'http://example.com/avatar.jpg'
 *                         theme:
 *                           type: string
 *                           example: 'dark'
 *               required:
 *                 - status
 *                 - data
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Email not verified
 *       500:
 *         description: Internal server error
 */

authRouter.post('/logout', authenticate, authControllers.logoutUser);

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
 *       500:
 *         description: Internal server error
 */

authRouter.get('/current', authenticate, authControllers.getCurrentUser);

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

authRouter.post(
  '/refresh',
  validateBody(refreshTokenSchema),
  authControllers.refreshTokens
);

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
 *         description: New tokens issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: 'newAccessToken123'
 *                     refreshToken:
 *                       type: string
 *                       example: 'newRefreshToken123'
 *               required:
 *                 - status
 *                 - data
 *       401:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
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
 * /api/auth/update:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Update user information
 *     parameters:
 *       - in: formData
 *         name: avatar
 *         type: file
 *         description: The new avatar image
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchUser'
 *
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: 'updatedUser123'
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: 'updateduser@example.com'
 *                     theme:
 *                       type: string
 *                       example: 'light'
 *                     avatarUrl:
 *                       type: string
 *                       format: uri
 *                       example: 'http://example.com/new-avatar.jpg'
 *               required:
 *                 - status
 *                 - data
 *       408:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */

authRouter.get('/verify/:verificationToken', authControllers.verifyUser);

/**
 * @openapi
 * /api/auth/verify/:verificationToken:
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

authRouter.post(
  '/verify',
  validateBody(resendVerifyMessageSchema),
  authControllers.resendVerifyMessage
);

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

export default authRouter;
