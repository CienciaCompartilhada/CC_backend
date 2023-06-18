import { Router } from 'express';

import { createUserSchema, setUserUniversitySchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllStudents, getAllTeachers, setUserUniversity, usersPost } from '@/controllers';

const usersRouter = Router();

usersRouter
  .post('/', validateBody(createUserSchema), usersPost)
  .post('/university', validateBody(setUserUniversitySchema), setUserUniversity)
  .all('/*', authenticateToken)
  .get('/teachers', getAllTeachers)
  .get('/students', getAllStudents);

export { usersRouter };
