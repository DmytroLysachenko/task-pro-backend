import Joi from 'joi';
import HttpError from './HttpError';
import { NextFunction, Request, Response } from 'express';

const validateBody = (schema: Joi.ObjectSchema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error && error.message === '"value" must have at least 1 key') {
      return HttpError(res, 400, 'Body must have at least one field');
    }
    if (error) {
      HttpError(res, 400, error.message);
    }
    next();
  };

  return func;
};

export default validateBody;
