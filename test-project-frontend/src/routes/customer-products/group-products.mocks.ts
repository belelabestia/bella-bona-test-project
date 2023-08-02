import { ProductGroupModel } from "../../types/product-group-model";
import { ProductModel } from "../../types/product-model";

export const mockProducts: ProductModel[] = [
  {
    id: 1,
    name: "Product 1 order 1",
    quantity: 2,
    status: "processing",
    productId: 1,
    orderId: 1,
    orderDate: "2020-01-01T00:00:00.000Z"
  },
  {
    id: 2,
    name: "Product 1 order 1",
    quantity: 5,
    status: "processing",
    productId: 1,
    orderId: 1,
    orderDate: "2020-01-01T00:00:00.000Z"
  },
  {
    id: 3,
    name: "Product 2 order 2",
    quantity: 2,
    status: "done",
    productId: 2,
    orderId: 2,
    orderDate: "2020-01-02T00:00:00.000Z"
  },
  {
    id: 5,
    name: "Product 3 order 3",
    quantity: 6,
    status: "done",
    productId: 3,
    orderId: 3,
    orderDate: "2020-01-03T00:00:00.000Z"
  },
  {
    id: 4,
    name: "Product 1 order 3",
    quantity: 2,
    status: "processing",
    productId: 1,
    orderId: 3,
    orderDate: "2020-01-03T00:00:00.000Z"
  },
  {
    id: 6,
    name: "Product 1 order 3",
    quantity: 1,
    status: "processing",
    productId: 1,
    orderId: 3,
    orderDate: "2020-01-03T00:00:00.000Z"
  },
  {
    id: 8,
    name: "Product 2 order 4",
    quantity: 3,
    status: "done",
    productId: 2,
    orderId: 4,
    orderDate: "2020-01-04T00:00:00.000Z"
  },
  {
    id: 7,
    name: "Product 1 order 4",
    quantity: 1,
    status: "processing",
    productId: 1,
    orderId: 4,
    orderDate: "2020-01-04T00:00:00.000Z"
  },
  {
    id: 9,
    name: "Product 2 order 5",
    quantity: 2,
    status: "processing",
    productId: 2,
    orderId: 5,
    orderDate: "2020-01-05T00:00:00.000Z"
  }
];

export const expectedGroups: ProductGroupModel[] = [
  {
    sku: 1,
    name: "Product 1 order 1",
    quantity: 11,
    status: "processing",
    products: [
      {
        id: 1,
        name: "Product 1 order 1",
        quantity: 2,
        status: "processing",
        productId: 1,
        orderId: 1,
        orderDate: "2020-01-01T00:00:00.000Z"
      },
      {
        id: 2,
        name: "Product 1 order 1",
        quantity: 5,
        status: "processing",
        productId: 1,
        orderId: 1,
        orderDate: "2020-01-01T00:00:00.000Z"
      },
      {
        id: 4,
        name: "Product 1 order 3",
        quantity: 2,
        status: "processing",
        productId: 1,
        orderId: 3,
        orderDate: "2020-01-03T00:00:00.000Z"
      },
      {
        id: 6,
        name: "Product 1 order 3",
        quantity: 1,
        status: "processing",
        productId: 1,
        orderId: 3,
        orderDate: "2020-01-03T00:00:00.000Z"
      },
      {
        id: 7,
        name: "Product 1 order 4",
        quantity: 1,
        status: "processing",
        productId: 1,
        orderId: 4,
        orderDate: "2020-01-04T00:00:00.000Z"
      }
    ]
  },
  {
    sku: 2,
    name: "Product 2 order 2",
    quantity: 7,
    status: "processing",
    products: [
      {
        id: 3,
        name: "Product 2 order 2",
        quantity: 2,
        status: "done",
        productId: 2,
        orderId: 2,
        orderDate: "2020-01-02T00:00:00.000Z"
      },
      {
        id: 8,
        name: "Product 2 order 4",
        quantity: 3,
        status: "done",
        productId: 2,
        orderId: 4,
        orderDate: "2020-01-04T00:00:00.000Z"
      },
      {
        id: 9,
        name: "Product 2 order 5",
        quantity: 2,
        status: "processing",
        productId: 2,
        orderId: 5,
        orderDate: "2020-01-05T00:00:00.000Z"
      }
    ]
  },
  {
    sku: 3,
    name: "Product 3 order 3",
    quantity: 6,
    status: "done",
    products: [
      {
        id: 5,
        name: "Product 3 order 3",
        quantity: 6,
        status: "done",
        productId: 3,
        orderId: 3,
        orderDate: "2020-01-03T00:00:00.000Z"
      }
    ]
  }
];
