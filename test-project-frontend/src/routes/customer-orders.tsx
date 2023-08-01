import { LoaderFunction, useLoaderData } from "react-router-dom";

export const ordersLoader: LoaderFunction = () => fetch("/api/orders").then(res => res.json());

export const CustomerOrders = () => {
  const orders = useLoaderData();
  return <pre>{JSON.stringify(orders, null, 2)}</pre>
};

export default CustomerOrders;
