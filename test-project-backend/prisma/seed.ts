import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clear = async () => {
  await prisma.$connect();
  await prisma.customer.deleteMany();
};

const seedCustomers = async () => {
  await prisma.customer.createMany({
    data: [
      { name: "Customer 1" },
      { name: "Customer 2" }
    ]
  });
};

const main = async () => {
  try {
    await prisma.$connect();
  
    await clear();
    await seedCustomers();
  
    console.log("seeding complete!");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }  
};

main();
