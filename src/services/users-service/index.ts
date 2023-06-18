import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';
import { forbiddenOperationError, invalidDataError } from '@/errors';

export async function createUser({ name, email, password, is_teacher }: CreateUserParams): Promise<users> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword,
    is_teacher,
  });
}

export async function getUsersUsingMatch(userId: number, is_teacher: boolean) {
  const users = await userRepository.findUsersUsingMatch(userId, is_teacher);
  const result = [];
  for (let i = 0; i < users.length; i++) {
    result.push({
      name: users[i].name,
    });
  }
  return result;
}

async function setUserUniversity(userId: number, universityId: number) {
  const userUni = await userRepository.findUserUniversity(userId);
  if (userUni.length !== 0) throw forbiddenOperationError();
  const result = await userRepository.setUserUniversity(userId, universityId);
  return result;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<users, 'name' | 'email' | 'password' | 'is_teacher'>;

const userService = {
  createUser,
  getUsersUsingMatch,
  setUserUniversity,
};

export * from './errors';
export default userService;
