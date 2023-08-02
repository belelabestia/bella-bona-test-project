import { Status } from "./status";

export type OrderModel = {
  id: number;
  date: string;
  status: Status;
  customerId: number;
  orderedProducts: {
    id: number;
    name: string;
    status: Status;
  }[];
};
