import { Status } from "./status";

export type OrderModel = {
  id: number;
  date: string;
  status: Status;
  customerId: number;
};
