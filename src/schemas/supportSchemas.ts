import Joi from 'joi';

export const createSupportRequestSchema = Joi.object({
  email: Joi.string().required().email(),
  message: Joi.string().required(),
});
