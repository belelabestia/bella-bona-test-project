import "./product.sass";

export type ProductModel = {
  id: number;
  name: string;
  quantity: number;
  status: "processing" | "done";
  productId: number;
  orderId: number;
  orderDate: string;
};

type Props = {
  product: ProductModel;
}

export const Product = ({ product }: Props) => <div className="product">
  <p>Name: {product.name}</p>
  <p>Quantity: {product.quantity}</p>
  <p>Status: {product.status}</p>
  <p>Order date: {new Date(product.orderDate).toLocaleDateString()}</p>
</div>;

export default Product;
