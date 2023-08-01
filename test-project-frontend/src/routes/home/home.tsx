import Customer from "../../components/customer/customer";
import "./home.sass";
import { useContext } from "react";
import { CustomerContext } from "../../App";

export const Home = () => {
  const { customers } = useContext(CustomerContext);

  return <div id="home">
    <h1>Welcome!</h1>
    <p>Please, pick a customer:</p>
    {
      customers.length !== 0
        ? <ul>
          {customers.map(customer => <li key={customer.id}>
            <Customer customer={customer} />
          </li>)}
        </ul>
        : <p>Sorry, this list is empty.</p>
    }
  </div>;
};

export default Home;
