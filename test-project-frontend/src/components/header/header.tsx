import { Link, NavLink } from "react-router-dom";
import "./header.sass";
import { useContext } from "react";
import { AppContext } from "../../app";

const Header = () => {
  const [selectedCustomer] = useContext(AppContext);

  return <header>
    <nav>
      <ul>
        <li><NavLink to="/home">🏠 Home</NavLink></li>
        {selectedCustomer !== null && <>
          <li id="customer-name"><Link to="/home">👤 {selectedCustomer.name}</Link></li>
          <li><NavLink to={`/customer/${selectedCustomer.id}/products`}>📦 Products</NavLink></li>
          <li><NavLink to={`/customer/${selectedCustomer.id}/orders`}>🛒 Orders</NavLink></li>
        </>}
      </ul>
    </nav>
  </header>;
};

export default Header;
