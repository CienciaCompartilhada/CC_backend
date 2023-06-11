import { AuthenticatedRequest } from '@/middlewares';
import projectService from '@/services/projects-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getProjects(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await projectService.getProjects();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
