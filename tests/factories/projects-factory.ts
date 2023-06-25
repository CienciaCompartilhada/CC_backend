import { expertise, projects, university, users } from '@prisma/client';
import faker from '@faker-js/faker';
import { createTeacher } from './users-factory';
import { prisma } from '@/config';
import { createUniversity } from './university-factory';
import { createExpertise } from './expertise-factory';

export async function createProject(teacher: users, university: university, expertise: expertise): Promise<projects> {
  const startDate = new Date(faker.datatype.datetime());
  const endDate = new Date(faker.datatype.datetime());
  const postedTime = new Date(faker.datatype.datetime());

  return prisma.projects.create({
    data: {
      id: faker.datatype.number(),
      professor_id: teacher.id,
      university_id: university.id,
      expertise_id: expertise.id,
      name: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      start_date: startDate,
      end_date: endDate,
      posted_time: postedTime,
    },
  });
}
