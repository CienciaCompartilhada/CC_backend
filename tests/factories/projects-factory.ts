import { expertise, projects, university, users } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createProject(teacher: users, university: university, expertise: expertise): Promise<projects> {
  const startDate = new Date(faker.datatype.datetime());
  const endDate = new Date(faker.datatype.datetime());
  const postedTime = new Date(faker.datatype.datetime());

  return prisma.projects.create({
    data: {
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
