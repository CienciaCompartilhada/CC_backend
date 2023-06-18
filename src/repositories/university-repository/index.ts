import { prisma } from '@/config';

async function findUniversityById(uniId: number) {
  return prisma.university.findUnique({
    where: {
      id: uniId,
    },
  });
}

async function findAllUniversities() {
  return prisma.university.findMany({});
}

const universityRepository = {
  findUniversityById,
  findAllUniversities,
};

export default universityRepository;
