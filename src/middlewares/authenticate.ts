// import HttpError from '../helpers/HttpError';
// import jwt from 'jsonwebtoken';
// import { findUser } from '../services/authServices';
// import { env } from '../helpers/env.js';

// export const authenticate = async (req, res, next) => {
//   const { authorization } = req.headers;
//   const JWT_SECRET = env('JWT_SECRET');

//   if (!authorization) {
//     return next(HttpError(401, `Authorization header not found`));
//   }

//   const [bearer, token] = authorization.split(' ');
//   if (bearer !== 'Bearer') {
//     return next(HttpError(401, 'Bearer not found'));
//   }

//   try {
//     const { id } = jwt.verify(token, JWT_SECRET);
//     const user = await findUser({ _id: id });
//     if (!user) {
//       return next(HttpError(401, 'User not found'));
//     }

//     if (!user.token) {
//       return next(HttpError(401, 'User already logged out'));
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     next(HttpError(401, error.message));
//   }
// };
