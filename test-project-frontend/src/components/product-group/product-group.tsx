import Product from "../product/product";
import { ProductGroupModel } from "../../types/product-group-model";
import "./product-group.sass";

type Props = { group: ProductGroupModel; }

export const ProductGroup = ({ group }: Props) => <div className="product-group">
  <p>SKU: {group.sku}</p>
  <p>Name: {group.name}</p>
  <p>Quantity: {group.quantity}</p>
  <div className="products">
    <h3>Products</h3>
    <ul>
      {group.products.map(product => <li key={product.id}>
        <Product product={product} />
      </li>)}
    </ul>
  </div>
</div>;

export default ProductGroup;
