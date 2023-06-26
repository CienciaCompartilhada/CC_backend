import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const universities = [
    "UNB - Universidade de Brasília",
    "UFMG - Universidade Federal de Minas Gerais",
    "UFBA - Universidade Federal da Bahia",
    "UniCeub - Centro Universitário de Brasília",
  ];

  const expertise = [
    "Engenharia Civil",
    "Medicina",
    "Direito",
    "Administração",
  ];

  const universityPromises = universities.map((name) =>
    prisma.university.create({
      data: {
        name,
      },
    })
  );

  const expertisePromises = expertise.map((name) =>
    prisma.expertise.create({
      data: {
        name,
      },
    })
  );

  await Promise.all([...universityPromises, ...expertisePromises]);

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
