import { isValidObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

import HttpError from '../helpers/HttpError';

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id, userId, boardId, columnId, taskId } = req.params;

  const ids = [id, userId, boardId, columnId, taskId].filter(
    (id) => id !== undefined
  );

  for (const id of ids) {
    if (!isValidObjectId(id)) {
      next(new HttpError(404, `${id} is not a valid id`));
      return;
    }
  }

  next();
};

export default isValidId;
