import "./order.sass";

export type OrderModel = {
  id: number;
  name: string;
};

type Props = {
  order: OrderModel;
}

export const Order = ({ order }: Props) => {
  return <pre>{JSON.stringify(order, null, 2)}</pre>
};

export default Order;
