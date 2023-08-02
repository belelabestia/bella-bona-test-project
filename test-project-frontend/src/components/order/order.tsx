import { ActionFunction, Form, redirect, useParams } from "react-router-dom";
import { OrderModel } from "../../types/order-model";
import "./order.sass";
import { useState } from "react";
import { post } from "../../utils/post";

type Props = { order: OrderModel; }

export const saveOrder: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const { id: orderId, ...updates } = Object.fromEntries(formData);
  const { id: customerId } = params;

  await fetch(`/api/orders/${orderId}`, post(updates));
  return redirect(`/customer/${customerId}/orders`);
};

export const Order = ({ order }: Props) => {
  const { id } = useParams();
  const [edited, setEdited] = useState(false);
  const edit = () => setEdited(true);

  return <Form className="order" method="post" action={`/customer/${id}/orders`}>
    <input type="hidden" name="id" value={order.id} />
    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
    <p>
      Status:
      <select name="status" defaultValue={order.status} onChange={edit}>
        <option value="processing">processing</option>
        <option value="done">done</option>
      </select>
    </p>
    {edited && <button type="submit">Save</button>}
  </Form>;
};

export default Order;
