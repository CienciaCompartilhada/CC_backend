import { prisma } from '@/config';

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

const expertiseRepository = {
  findExpertiseById,
  removeUserExpertises,
};

export default expertiseRepository;
