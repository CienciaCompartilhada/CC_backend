import { Request, Response } from 'express';
import httpStatus from 'http-status';
import universityRepository from '@/repositories/university-repository';

export async function getUniversities(req: Request, res: Response) {
  try {
    const result = await universityRepository.findAllUniversities();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
