import { Router } from 'express';

import { getUniversities } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const universitiesRouter = Router();

universitiesRouter.all('/*', authenticateToken).get('/', getUniversities);

export { universitiesRouter };
