import { LoaderFunction, useLoaderData } from "react-router-dom";

export const productsLoader: LoaderFunction = ({ params }) => fetch("/api/products").then(res => res.json());

export const CustomerProducts = () => {
  const products = useLoaderData();
  return <pre>{JSON.stringify(products, null, 2)}</pre>;
};

export default CustomerProducts;
