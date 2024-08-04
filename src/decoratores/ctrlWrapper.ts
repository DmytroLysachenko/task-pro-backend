import { Controller } from '../types';
import HttpError from '../helpers/HttpError';

const ctrlWrapper = (controller: Controller) => {
  const func: Controller = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        return HttpError(res, 400, error.message);
      } else {
        return HttpError(res);
      }
    }
  };

  return func;
};

export default ctrlWrapper;
