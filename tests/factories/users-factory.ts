import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { expertise, university, users } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<users> = {}): Promise<users> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.users.create({
    data: {
      name: faker.name.firstName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      is_teacher: faker.datatype.boolean(),
    },
  });
}

export async function createTeacher(): Promise<users> {
  const password = await bcrypt.hash(faker.internet.password(), 10);
  return prisma.users.create({
    data: {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: password,
      is_teacher: true,
    },
  });
}

export async function createStudent(): Promise<users> {
  const password = await bcrypt.hash(faker.internet.password(), 10);
  return prisma.users.create({
    data: {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: password,
      is_teacher: false,
    },
  });
}

export async function connectUserUniversity(user: users, university: university) {
  await prisma.user_university.create({
    data: {
      university_id: university.id,
      user_id: user.id,
    },
  });
}

export async function connectUserExpertise(user: users, expertise: expertise) {
  await prisma.user_expertise.create({
    data: {
      expertise_id: expertise.id,
      user_id: user.id,
    },
  });
}
