import { Router } from 'express';

import { createUserSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllStudents, getAllTeachers, usersPost } from '@/controllers';

const usersRouter = Router();

usersRouter
  .post('/', validateBody(createUserSchema), usersPost)
  .all('/*', authenticateToken)
  .get('/teachers', getAllTeachers)
  .get('/students', getAllStudents);

export { usersRouter };
