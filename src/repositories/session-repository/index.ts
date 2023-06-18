import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.sessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function deleteById(user_id: number) {
  return prisma.session.deleteMany({
    where: {
      user_id: user_id,
    },
  });
}

const sessionRepository = {
  create,
  deleteById,
};

export default sessionRepository;
