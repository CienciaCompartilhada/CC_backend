import { getAllExpertises, updateExpertise } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { updateExpertisesSchema } from '@/schemas/expertise-schemas';
import { Router } from 'express';

const expertisesRouter = Router();

expertisesRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(updateExpertisesSchema), updateExpertise)
  .get('/all', getAllExpertises);

export { expertisesRouter };
