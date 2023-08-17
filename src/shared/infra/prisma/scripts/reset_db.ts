import { prisma } from "..";

async function main() {
  try {
    console.log(`🚀 Resetting database sosauto`);
    await prisma.$executeRaw`USE DATABASE sosauto_temp;`;
    await prisma.$executeRaw`DROP DATABASE IF EXISTS sosauto`;
    await prisma.$executeRaw`CREATE DATABASE sosauto;`;
    await prisma.$executeRaw`USE DATABASE sosauto;`;
    await prisma.$executeRaw`DROP DATABASE IF EXISTS sosauto_temp;`;
    await prisma.$disconnect();
    console.log("✅ Database reseted!");
  } catch (error) {
    throw new Error("\n❌ Erro ao tentar restar o banco: " + error.message);
  }
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error(
      "❌ Não foi possivel resetar o banco de dados: ",
      error.message
    );
  });
