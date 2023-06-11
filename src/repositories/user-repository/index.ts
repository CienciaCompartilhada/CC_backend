import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.usersSelect) {
  const params: Prisma.usersFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
}

async function findById(userId: number) {
  return prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
}

async function create(data: Prisma.usersUncheckedCreateInput) {
  return prisma.users.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  findById,
  create,
};

export default userRepository;
