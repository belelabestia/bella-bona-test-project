import "./product.sass";

export type ProductModel = {
  id: number;
  name: string;
};

type Props = {
  product: ProductModel;
}

export const Product = ({ product }: Props) => {
  return <pre>{JSON.stringify(product, null, 2)}</pre>
};

export default Product;
