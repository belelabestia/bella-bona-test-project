import { LoaderFunction, useLoaderData } from "react-router-dom";
import Product, { ProductModel } from "../../components/product/product";
import "./customer-products.sass";

export const productsLoader: LoaderFunction = ({ params }) => fetch(`/api/products?customerId=${params["id"]}`).then(res => res.json());

export const CustomerProducts = () => {
  const products = useLoaderData() as ProductModel[];
  return <ul id="customer-products">
    {products.map(product => <li key={product.id}>
      <Product key={product.id} product={product} />
    </li>)}
  </ul>;
};

export default CustomerProducts;
