import boardBgImages from '../constants/boardBgImgs';
import HttpError from '../helpers/HttpError';
import { Controller } from '../types';

export const backgroundConvert: Controller = async (req, res, next) => {
  try {
    const { backgroundImg }: { backgroundImg: string | null } = req.body;

    if (backgroundImg && !Object.keys(boardBgImages).includes(backgroundImg)) {
      throw new HttpError(
        400,
        `Bad request. ${backgroundImg} is not valid background image`
      );
    } else if (backgroundImg) {
      req.body.backgroundImg = boardBgImages[backgroundImg];
    } else {
      req.body.backgroundImg = null;
    }

    next();
  } catch (error) {
    next(error);
  }
};
