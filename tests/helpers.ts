import * as jwt from 'jsonwebtoken';
import { users } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.expertise_courses.deleteMany({});
  await prisma.user_expertise.deleteMany({});
  await prisma.user_university.deleteMany({});
  await prisma.projects.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.expertise.deleteMany({});
  await prisma.university.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: users) {
  const incomingUser = user || (user = await createUser());
  const token = jwt.sign({ user_id: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(user.id, token);

  return token;
}
