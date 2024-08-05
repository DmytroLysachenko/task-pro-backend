import { isValidObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

import HttpError from '../helpers/HttpError';

const isValidId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id: requestedResourseId,
      userId,
      boardId,
      columnId,
      taskId,
    } = req.params;

    const ids = { requestedResourseId, userId, boardId, columnId, taskId };

    for (const [key, value] of Object.entries(ids)) {
      if (value && !isValidObjectId(value)) {
        next(new HttpError(404, `${key} ${value} is not a valid id`));
        return;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isValidId;
