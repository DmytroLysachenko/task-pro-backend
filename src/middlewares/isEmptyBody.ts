import { NextFunction, Request, Response } from 'express';

import HttpError from '../helpers/HttpError.js';

const isEmptyBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Object.keys(req.body).length) {
      throw new HttpError(400, 'Body cannot be empty');
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isEmptyBody;
