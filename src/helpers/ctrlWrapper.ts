import { Controller } from '../types';

const ctrlWrapper = (controller: Controller) => {
  const func: Controller = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
