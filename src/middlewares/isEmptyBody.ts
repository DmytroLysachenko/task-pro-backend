import { NextFunction, Request, Response } from 'express';

import HttpError from '../helpers/HttpError.js';

const isEmptyBody = (req: Request, res: Response, next: NextFunction) => {
  if (!Object.keys(req.body).length) {
    return HttpError(res, 400, 'Body cannot be empty');
  }
  next();
};

export default isEmptyBody;