import { ProductGroupModel } from "../../types/product-group-model";
import { ProductModel } from "../../types/product-model";
import { Status } from "../../types/status";

export const groupProducts = (products: ProductModel[]): ProductGroupModel[] =>
  products
    .map(product => product.productId)
    .filter(distinct)
    .reduce(
      (groups: ProductGroupModel[], sku: number): ProductGroupModel[] => {
        const productsOfGroup = products.filter(product => product.productId === sku);
        return [...groups, makeGroup(sku, productsOfGroup)]
      },
      []
    );


const makeGroup = (sku: number, products: ProductModel[]): ProductGroupModel => {
  const name = products[0].name;

  const quantity = products
    .map(product => product.quantity)
    .reduce(sum, 0);

  const status = products
    .map(product => product.status)
    .reduce(reduceStatus, "done");

  return {
    sku,
    name,
    quantity,
    status,
    products
  };
};

const distinct = <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index;
const sum = (sum: number, x: number): number => sum + x;
const reduceStatus = (final: Status, next: Status) => final !== next ? "processing" : final;
