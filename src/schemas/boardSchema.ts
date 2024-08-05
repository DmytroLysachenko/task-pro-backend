import Joi from 'joi';
import boardIcons from '../constants/boardIcons';

const boardSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  icon: Joi.string()
    .valid(...boardIcons)
    .default('icon_1'),
  backgroundImg: Joi.string().allow(null).default(null),
});

const boardUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  icon: Joi.string()
    .valid(...boardIcons)
    .optional(),
  backgroundImg: Joi.string().allow(null).optional(),
});

export { boardSchema, boardUpdateSchema };
