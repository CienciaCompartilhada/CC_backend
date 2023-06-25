import { expertise } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createExpertise(): Promise<expertise> {
  return prisma.expertise.create({
    data: {
      id: faker.datatype.number(),
      name: faker.name.jobTitle(),
    },
  });
}
