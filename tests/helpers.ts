import * as jwt from 'jsonwebtoken';
import { users } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.expertise_courses.deleteMany({});
  await prisma.user_expertise.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.expertise.deleteMany({});
  await prisma.projects.deleteMany({});
  await prisma.university.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
