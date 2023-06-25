import { university } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createUniversity(): Promise<university> {
  return prisma.university.create({
    data: {
      id: faker.datatype.number(),
      name: faker.name.jobTitle(),
    },
  });
}
