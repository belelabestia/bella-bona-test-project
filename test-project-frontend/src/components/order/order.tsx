import "./order.sass";

export type OrderModel = {
  id: number;
  date: string;
  status: "processing" | "done";
  customerId: number;
};

type Props = {
  order: OrderModel;
}

export const Order = ({ order }: Props) => <div className="order">
  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
  <p>Status: {order.status}</p>
</div>;

export default Order;
