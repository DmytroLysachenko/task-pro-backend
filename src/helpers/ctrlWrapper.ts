import { Request, Response, NextFunction } from 'express';
import { Controller } from '../types';

const ctrlWrapper = (controller: Controller) => {
  const func: Controller = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
