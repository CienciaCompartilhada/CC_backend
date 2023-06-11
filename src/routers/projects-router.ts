import { Router } from 'express';

import { getProjects } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const projectsRouter = Router();

projectsRouter.all('/*', authenticateToken).get('/', getProjects);

export { projectsRouter };
