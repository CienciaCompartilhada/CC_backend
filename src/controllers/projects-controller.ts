import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import projectService from '@/services/projects-service';

export async function getProjects(req: AuthenticatedRequest, res: Response) {
  const { user_id } = req;
  try {
    const result = await projectService.getProjects(user_id);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
