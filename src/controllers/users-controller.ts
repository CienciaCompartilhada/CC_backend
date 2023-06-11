import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/users-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function usersPost(req: Request, res: Response) {
  const { name, email, password, is_teacher } = req.body;

  try {
    const user = await userService.createUser({ name, email, password, is_teacher });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getAllTeachers(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await userService.getAllTeachers();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}

export async function getAllStudents(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await userService.getAllStudents();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}
