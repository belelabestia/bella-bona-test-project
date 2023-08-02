import { useState } from "react";
import { ProductModel } from "../../types/product-model";
import { ActionFunction, Form, redirect, useParams } from "react-router-dom";
import "./product.sass";
import { post } from "../../utils/post";

type Props = { product: ProductModel; };

export const saveProduct: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const { id: productId, ...updates } = Object.fromEntries(formData);
  const { id: customerId } = params;

  await fetch(`/api/products/${productId}`, post(updates));
  return redirect(`/customer/${customerId}/products`);
};

export const Product = ({ product }: Props) => {
  const { id } = useParams();
  const [edited, setEdited] = useState(false);
  const edit = () => setEdited(true);

  return <Form className="product" method="post" action={`/customer/${id}/products`}>
    <input type="hidden" name="id" value={product.id} />
    <p>Name: {product.name}</p>
    <p>Order date: {new Date(product.orderDate).toLocaleDateString()}</p>
    <p>
      Quantity:
      <input type="number" required name="quantity" defaultValue={product.quantity} onChange={edit} />
    </p>
    <p>
      Status:
      <select name="status" defaultValue={product.status} onChange={edit}>
        <option value="processing">processing</option>
        <option value="done">done</option>
      </select>
    </p>
    {edited && <button type="submit">Save</button>}
  </Form>;
};

export default Product;
