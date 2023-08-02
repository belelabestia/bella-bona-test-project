import Product from "../product/product";
import { ProductGroupModel } from "../../types/product-group-model";
import "./product-group.sass";
import { useMemo, useState } from "react";

type Props = { group: ProductGroupModel; }

export const ProductGroup = ({ group }: Props) => {
  const [showProducts, setShowProducts] = useState(false);

  return <div className="product-group">
    <p>Name: {group.name}</p>
    <p>SKU: {group.sku}</p>
    <p>Quantity: {group.quantity}</p>
    <p>Status: {group.status}</p>
    {showProducts
      ? <>
        <button onClick={() => setShowProducts(false)}>Hide ordered products</button>
        <div className="products">
          <h3>Products</h3>
          <ul>
            {group.products.map(product => <li key={product.id}>
              <Product product={product} />
            </li>)}
          </ul>
        </div>
      </>
      : <button onClick={() => setShowProducts(true)}>Edit ordered products</button>}
  </div>;
};

export default ProductGroup;
