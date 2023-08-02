import { OrderModel } from "../../types/order-model";
import "./order.sass";

type Props = { order: OrderModel; }

export const Order = ({ order }: Props) => <div className="order">
  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
  <p>Status: {order.status}</p>
</div>;

export default Order;
