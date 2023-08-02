import { ProductModel } from "../../types/product-model";
import "./product.sass";

type Props = { product: ProductModel; };

export const Product = ({ product }: Props) => <div className="product">
  <p>Name: {product.name}</p>
  <p>Quantity: {product.quantity}</p>
  <p>Status: {product.status}</p>
  <p>Order date: {new Date(product.orderDate).toLocaleDateString()}</p>
</div>;

export default Product;
