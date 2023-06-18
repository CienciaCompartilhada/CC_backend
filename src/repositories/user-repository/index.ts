import { Prisma, user_expertise, user_university } from '@prisma/client';
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

async function findUsersUsingMatch(
  userId: number,
  is_teacher: boolean,
): Promise<[{ id: number; name: string; common_expertises: number }]> {
  return prisma.$queryRaw`
    SELECT
      u.id,
      u.name,
      COUNT(ui2.expertise_id) AS common_expertises
    FROM
        users u
        LEFT JOIN user_expertise ui1 ON u.id = ui1.user_id
        LEFT JOIN user_expertise ui2 ON ui1.expertise_id = ui2.expertise_id
                                      AND ui2.user_id = ${userId}
    WHERE
        u.id <> ${userId} AND u.is_teacher = ${is_teacher}
    GROUP BY
        u.id, u.name
    ORDER BY
        common_expertises DESC;
  `;
}

async function setUserUniversity(userId: number, universityId: number) {
  return prisma.user_university.create({
    data: {
      university_id: universityId,
      user_id: userId,
    },
  });
}

async function setUserExpertise(userId: number, expertiseId: number) {
  return prisma.user_expertise.create({
    data: {
      expertise_id: expertiseId,
      user_id: userId,
    },
  });
}

async function findUserUniversity(userId: number): Promise<user_university[]> {
  return prisma.user_university.findMany({
    where: {
      user_id: userId,
    },
  });
}

async function findUserExpertises(userId: number): Promise<user_expertise[]> {
  return prisma.user_expertise.findMany({
    where: {
      user_id: userId,
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
  findUsersUsingMatch,
  findUserUniversity,
  findUserExpertises,
  setUserUniversity,
  setUserExpertise,
  create,
};

export default userRepository;
