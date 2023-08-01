import { LoaderFunction, useLoaderData } from "react-router-dom";
import Order, { OrderModel } from "../../components/order/order";
import "./customer-orders.sass";

export const ordersLoader: LoaderFunction = ({ params }) => fetch(`/api/orders?customerId=${params["id"]}`).then(res => res.json());

export const CustomerOrders = () => {
  const orders = useLoaderData() as OrderModel[];

  return <ul id="customer-orders">
    {orders.map(order => <li key={order.id}>
      <Order order={order} />
    </li>)}
  </ul>;
};

export default CustomerOrders;
