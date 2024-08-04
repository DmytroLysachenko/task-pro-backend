import HttpError from '../helpers/HttpError';
import jwt from 'jsonwebtoken';
import { findUser } from '../services/authServices';
import { env } from '../helpers/env.js';
import { Controller } from '../types';

export const authenticate: Controller = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const JWT_SECRET = env('JWT_SECRET');

    if (!authorization) {
      throw new HttpError(401, `Authorization header not found`);
    }

    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new HttpError(401, 'Bearer not found');
    }
    const { id } = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    const user = await findUser({ _id: id });
    if (!user) {
      throw new HttpError(401, 'User not found');
    }

    if (!user.accessToken) {
      throw new HttpError(401, 'User already logged out');
    }

    const { _id, username, email, avatarUrl, theme, isVerified } = user;

    if (!user.isVerified) {
      throw new HttpError(401, 'User is not verified');
    }

    req.user = {
      _id,
      username,
      email,
      avatarUrl,
      theme,
      isVerified,
    };

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new HttpError(401, error.message));
    } else {
      next(error);
    }
  }
};
