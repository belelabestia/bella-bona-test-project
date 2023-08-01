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

const seedProductOrders = () => prisma.productOrder.createMany({
  data: [
    {
      id: 1,
      name: "Product 1 order 1",
      productId: 1,
      quantity: 2,
      status: "processing",
      orderId: 1,
      orderDate: new Date("2020-01-01")
    },
    {
      id: 2,
      name: "Product 1 order 1",
      productId: 1,
      quantity: 5,
      status: "processing",
      orderId: 1,
      orderDate: new Date("2020-01-01")
    },
    {
      id: 3,
      name: "Product 2 order 2",
      productId: 2,
      quantity: 2,
      status: "done",
      orderId: 2,
      orderDate: new Date("2020-01-02")
    },
    {
      id: 4,
      name: "Product 1 order 3",
      productId: 1,
      quantity: 2,
      status: "processing",
      orderId: 3,
      orderDate: new Date("2020-01-03")
    },
    {
      id: 5,
      name: "Product 3 order 3",
      productId: 3,
      quantity: 6,
      status: "done",
      orderId: 3,
      orderDate: new Date("2020-01-03")
    },
    {
      id: 6,
      name: "Product 1 order 3",
      productId: 1,
      quantity: 1,
      status: "processing",
      orderId: 3,
      orderDate: new Date("2020-01-03")
    },
    {
      id: 7,
      name: "Product 1 order 4",
      productId: 1,
      quantity: 1,
      status: "processing",
      orderId: 4,
      orderDate: new Date("2020-01-04")
    },
    {
      id: 8,
      name: "Product 2 order 4",
      productId: 2,
      quantity: 3,
      status: "done",
      orderId: 4,
      orderDate: new Date("2020-01-04")
    },
    {
      id: 9,
      name: "Product 2 order 5",
      productId: 2,
      quantity: 2,
      status: "processing",
      orderId: 5,
      orderDate: new Date("2020-01-05")
    },
    {
      id: 10,
      name: "Product 3 order 6",
      productId: 3,
      quantity: 5,
      status: "done",
      orderId: 6,
      orderDate: new Date("2020-02-01")
    },
    {
      id: 11,
      name: "Product 3 order 6",
      productId: 3,
      quantity: 6,
      status: "processing",
      orderId: 6,
      orderDate: new Date("2020-02-01")
    },
    {
      id: 12,
      name: "Product 2 order 7",
      productId: 2,
      quantity: 2,
      status: "done",
      orderId: 7,
      orderDate: new Date("2020-02-02")
    },
    {
      id: 13,
      name: "Product 3 order 8",
      productId: 3,
      quantity: 2,
      status: "processing",
      orderId: 8,
      orderDate: new Date("2020-02-03")
    },
    {
      id: 14,
      name: "Product 2 order 8",
      productId: 2,
      quantity: 2,
      status: "processing",
      orderId: 8,
      orderDate: new Date("2020-02-03")
    },
    {
      id: 15,
      name: "Product 1 order 9",
      productId: 1,
      quantity: 5,
      status: "processing",
      orderId: 9,
      orderDate: new Date("2020-02-04")
    },
    {
      id: 16,
      name: "Product 2 order 9",
      productId: 2,
      quantity: 2,
      status: "done",
      orderId: 9,
      orderDate: new Date("2020-02-04")
    },
    {
      id: 17,
      name: "Product 2 order 9",
      productId: 2,
      quantity: 3,
      status: "processing",
      orderId: 9,
      orderDate: new Date("2020-02-04")
    },
    {
      id: 18,
      name: "Product 4 order 9",
      productId: 4,
      quantity: 1,
      status: "done",
      orderId: 9,
      orderDate: new Date("2020-02-04")
    },
    {
      id: 19,
      name: "Product 4 order 10",
      productId: 4,
      quantity: 2,
      status: "processing",
      orderId: 10,
      orderDate: new Date("2020-02-05")
    },
    {
      id: 20,
      name: "Product 1 order 10",
      productId: 1,
      quantity: 3,
      status: "processing",
      orderId: 10,
      orderDate: new Date("2020-02-05")
    }
  ]
});

const main = async () => {
  try {
    await prisma.$connect();

    await clear();
    await seedCustomers();
    await seedOrders();
    await seedProductOrders();

    console.log("seeding complete!");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};

main();
