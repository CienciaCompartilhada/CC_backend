import Joi from 'joi';

export const updateExpertisesSchema = Joi.object({
  expertises: Joi.array().items(Joi.string().allow('')).required(),
});
