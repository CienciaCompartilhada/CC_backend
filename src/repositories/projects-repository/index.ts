import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getProjects() {
  return prisma.projects.findMany({
    orderBy: {
      id: 'desc',
    },
  });
}

const projectRepository = {
  getProjects,
};

export default projectRepository;
