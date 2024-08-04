import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(16),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(16),
});

export const patchSchema = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(16),
  theme: Joi.string().valid('light', 'dark', 'violet'),
});

export const resendVerifyMessageSchema = Joi.object().keys({
  email: Joi.string().required().email(),
});
