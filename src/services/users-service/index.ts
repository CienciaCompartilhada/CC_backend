import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';

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

export async function getAllTeachers() {
  const teachers = await userRepository.getAllTeachers();
  const result = [];
  for (let i = 0; i < teachers.length; i++) {
    result.push({
      name: teachers[i].name,
    });
  }
  return result;
}

export async function getAllStudents() {
  const students = await userRepository.getAllStudents();
  const result = [];
  for (let i = 0; i < students.length; i++) {
    result.push({
      name: students[i].name,
    });
  }
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
  getAllStudents,
  getAllTeachers,
};

export * from './errors';
export default userService;
