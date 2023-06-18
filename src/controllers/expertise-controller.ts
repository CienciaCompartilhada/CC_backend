import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import expertiseService from '@/services/expertise-service';

export async function updateExpertise(req: AuthenticatedRequest, res: Response) {
  const { user_id } = req;
  const { expertises } = req.body;
  try {
    const result = await expertiseService.updateExpertise(user_id, expertises);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getAllExpertises(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await expertiseService.getAllExpertises();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
