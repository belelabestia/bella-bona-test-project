import { Status } from "./status";

export type ProductModel = {
  id: number;
  name: string;
  quantity: number;
  status: Status;
  productId: number;
  orderId: number;
  orderDate: string;
};
