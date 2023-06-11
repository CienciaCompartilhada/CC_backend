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

async function getAllTeachers() {
  return prisma.users.findMany({
    where: {
      is_teacher: true,
    },
  });
}

async function getAllStudents() {
  return prisma.users.findMany({
    where: {
      is_teacher: false,
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
  getAllTeachers,
  getAllStudents,
  create,
};

export default userRepository;
