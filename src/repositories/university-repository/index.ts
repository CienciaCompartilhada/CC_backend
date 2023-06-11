import { prisma } from '@/config';

async function findUniversityById(uniId: number) {
  return prisma.university.findUnique({
    where: {
      id: uniId,
    },
  });
}

const universityRepository = {
  findUniversityById,
};

export default universityRepository;
