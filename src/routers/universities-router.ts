import { Router } from 'express';

import { getUniversities } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const universitiesRouter = Router();

universitiesRouter.get('/', getUniversities);

export { universitiesRouter };
