import HttpError from '../helpers/HttpError';
import jwt from 'jsonwebtoken';
import { findUser } from '../services/authServices';
import { env } from '../helpers/env.js';
import { Controller } from '../types';

export const authenticate: Controller = async (req, res, next) => {
  const { authorization } = req.headers;
  const JWT_SECRET = env('JWT_SECRET');

  if (!authorization) {
    return HttpError(res, 401, `Authorization header not found`);
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return HttpError(res, 401, 'Bearer not found');
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    const user = await findUser({ _id: id });
    if (!user) {
      return HttpError(res, 401, 'User not found');
    }

    if (!user.accessToken) {
      return HttpError(res, 401, 'User already logged out');
    }

    const { _id, username, email, avatarUrl, theme, isVerified } = user;

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
      HttpError(res, 401, error.message);
    } else {
      HttpError(res, 401, 'Something went wrong during authentication');
    }
  }
};
