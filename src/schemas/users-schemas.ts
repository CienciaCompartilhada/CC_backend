import Joi from 'joi';
import { CreateUserParams } from '@/services/users-service';

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  is_teacher: Joi.boolean().required(),
});

export const setUserUniversitySchema = Joi.object({
  universityId: Joi.number().required(),
  user_id: Joi.number().required(),
});
