import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().required(),
  tasks: Joi.array(),
});

export const updateColumnSchema = Joi.object({
  title: Joi.string().required(),
  tasks: Joi.array(),
});
