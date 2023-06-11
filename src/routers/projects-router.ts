import { Router } from 'express';

import { getProjects } from '@/controllers';

const projectsRouter = Router();

projectsRouter.get('/', getProjects);

export { projectsRouter };
