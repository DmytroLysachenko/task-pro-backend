import boardBgImages from '../constants/boardBgImgs';
import HttpError from '../helpers/HttpError';
import { Controller } from '../types';

export const backgroundConvert: Controller = async (req, res, next) => {
  try {
    const { backgroundImg }: { backgroundImg: string } = req.body;

    if (
      !Object.keys(boardBgImages).includes(backgroundImg) &&
      !backgroundImg === null
    ) {
      throw new HttpError(
        400,
        `Bad request. ${backgroundImg} is not valid background image`
      );
    }

    req.body.backgroundImg = boardBgImages[backgroundImg];

    next();
  } catch (error) {
    next(error);
  }
};
