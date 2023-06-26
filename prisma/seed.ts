import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedExpertise() {
  const expertise = [
    "Engenharia Civil",
    "Medicina",
    "Direito",
    "Administração",
  ];
  const expertisePromises = expertise.map(async (name) => {
    await prisma.expertise.deleteMany({
      where: {
        name: name,
      },
    });

    await prisma.expertise.create({
      data: {
        name,
      },
    });
  });

  await Promise.all(expertisePromises);
}

async function seedUniversity() {
  const universities = [
    "UNB - Universidade de Brasília",
    "UFMG - Universidade Federal de Minas Gerais",
    "UFBA - Universidade Federal da Bahia",
    "UniCeub - Centro Universitário de Brasília",
  ];
  const universityPromises = universities.map(async (name) => {
    await prisma.university.deleteMany({
      where: {
        name: name,
      },
    });

    await prisma.university.create({
      data: {
        name,
      },
    });
  });

  await Promise.all(universityPromises);
}

async function seed() {
  await seedExpertise();
  await seedUniversity();
  console.log("Dados de seed inseridos com sucesso!");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
