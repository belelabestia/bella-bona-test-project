import { LoaderFunction, useLoaderData } from "react-router-dom";
import { ProductModel } from "../../types/product-model";
import "./customer-products.sass";
import { useMemo } from "react";
import { groupProducts } from "./group-products";
import ProductGroup from "../../components/product-group/product-group";

export const fetchProducts: LoaderFunction = ({ params }) => fetch(`/api/products?customerId=${params["id"]}`).then(res => res.json());

export const CustomerProducts = () => {
  const products = useLoaderData() as ProductModel[];
  const groups = useMemo(() => groupProducts(products), [products]);

  return <ul id="customer-products">
    {groups.map(group => <li key={group.sku}>
      <ProductGroup group={group} />
    </li>)}
  </ul>;
};

export default CustomerProducts;
