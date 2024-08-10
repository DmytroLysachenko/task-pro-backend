import Joi from 'joi';

import existingColumnIdValidator from '../helpers/existingColumnIdValidator';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid('none', 'low', 'medium', 'high').default('none'),
  deadline: Joi.date().iso().optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid('none', 'low', 'medium', 'high').default('none'),
  deadline: Joi.date().iso().optional(),
  columnId: Joi.string().custom(
    existingColumnIdValidator,
    'Column id validation'
  ),
});

// "2015-03-25"
