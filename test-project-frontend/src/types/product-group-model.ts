import { ProductModel } from "./product-model";
import { Status } from "./status";

export type ProductGroupModel = {
  sku: number;
  name: string;
  quantity: number;
  status: Status;
  products: ProductModel[];
};
