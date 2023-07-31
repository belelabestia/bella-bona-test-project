import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clear = async () => {
  await prisma.$connect();
  await prisma.customer.deleteMany();
};

const seedCustomers = () => prisma.customer.createMany({
  data: [
    {
      id: 1,
      name: "Customer 1"
    },
    {
      id: 2,
      name: "Customer 2"
    }
  ]
});

const seedOrders = () => prisma.order.createMany({
  data: [
    {
      id: 1,
      customerId: 1,
      date: new Date("2020-01-01"),
      status: "processing"
    },
    {
      id: 2,
      customerId: 1,
      date: new Date("2020-01-02"),
      status: "processing"
    },
    {
      id: 3,
      customerId: 1,
      date: new Date("2020-01-03"),
      status: "processing"
    },
    {
      id: 4,
      customerId: 1,
      date: new Date("2020-01-04"),
      status: "done"
    },
    {
      id: 5,
      customerId: 1,
      date: new Date("2020-01-05"),
      status: "done"
    },
    {
      id: 6,
      customerId: 2,
      date: new Date("2020-02-01"),
      status: "processing"
    },
    {
      id: 7,
      customerId: 2,
      date: new Date("2020-02-02"),
      status: "processing"
    },
    {
      id: 8,
      customerId: 2,
      date: new Date("2020-02-03"),
      status: "processing"
    },
    {
      id: 9,
      customerId: 2,
      date: new Date("2020-02-04"),
      status: "done"
    },
    {
      id: 10,
      customerId: 2,
      date: new Date("2020-02-05"),
      status: "done"
    }
  ]
});

const main = async () => {
  try {
    await prisma.$connect();

    await clear();
    await seedCustomers();
    await seedOrders();

    console.log("seeding complete!");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

main();
