import Joi from 'joi';
import boardIcons from '../constants/boardIcons';

const boardSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  icon: Joi.string()
    .valid(...boardIcons)
    .default('icon_1'),
  backgroundImg: Joi.object().default({}),
  columns: Joi.array().items(Joi.object()).default([]),
});

const boardUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  icon: Joi.string()
    .valid(...boardIcons)
    .optional(),
  backgroundImg: Joi.object().optional(),
  columns: Joi.array().items(Joi.object()).optional(),
});

export { boardSchema, boardUpdateSchema };
