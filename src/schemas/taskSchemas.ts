import Joi from 'joi';

import existingColumnIdValidator from '../helpers/existingColumnIdValidator';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high').default(''),
  deadline: Joi.string(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid('low', 'medium', 'high').default(''),
  deadline: Joi.string(),
  columnId: Joi.string().custom(
    existingColumnIdValidator,
    'Column id validation'
  ),
});
