import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string(),
  deadline: Joi.string(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string(),
  deadline: Joi.string(),
});
