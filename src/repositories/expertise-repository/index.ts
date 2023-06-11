import { prisma } from '@/config';

async function findExpertiseById(expertiseId: number) {
  return prisma.expertise.findUnique({
    where: {
      id: expertiseId,
    },
  });
}

const expertiseRepository = {
  findExpertiseById,
};

export default expertiseRepository;
