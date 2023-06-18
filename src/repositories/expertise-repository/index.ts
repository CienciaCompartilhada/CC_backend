import { prisma } from '@/config';
import { expertise } from '@prisma/client';

async function findExpertiseById(expertiseId: number) {
  return prisma.expertise.findUnique({
    where: {
      id: expertiseId,
    },
  });
}

async function removeUserExpertises(userId: number) {
  return prisma.user_expertise.deleteMany({
    where: {
      user_id: userId,
    },
  });
}

async function findAllExpertises(): Promise<expertise[]> {
  return prisma.expertise.findMany({});
}

const expertiseRepository = {
  findExpertiseById,
  findAllExpertises,
  removeUserExpertises,
};

export default expertiseRepository;
