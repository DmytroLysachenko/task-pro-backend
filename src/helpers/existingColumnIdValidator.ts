import Joi from 'joi';
import { Types } from 'mongoose';

import Column from '../db/models/Column';

const existingColumnIdValidator = async (
  _id: Types.ObjectId,
  helpers: Joi.CustomHelpers
) => {
  const columnExists = await Column.exists({ _id });
  if (!columnExists) {
    return helpers.message({ custom: `Column with id:${_id} does not exist` });
  }

  return _id;
};

export default existingColumnIdValidator;
