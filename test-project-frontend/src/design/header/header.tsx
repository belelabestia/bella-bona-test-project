import { NavLink } from "react-router-dom";
import "./header.sass";

const Header = () => <header>
  <nav>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li></li>
      <li><NavLink to="customer/1/products">Products</NavLink></li>
      <li><NavLink to="customer/1/orders">Orders</NavLink></li>
    </ul>
  </nav>
</header>;

export default Header;
