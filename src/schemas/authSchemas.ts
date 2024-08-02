import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
