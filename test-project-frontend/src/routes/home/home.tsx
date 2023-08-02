import Customer from "../../components/customer/customer";
import { CustomerModel } from "../../types/customer-model";
import "./home.sass";
import { useLoaderData } from "react-router-dom";

export const customersLoader = () => fetch("/api/customer").then(res => res.json());

export const Home = () => {
  const customers = useLoaderData() as CustomerModel[];

  return <div id="home">
    <h1>Welcome!</h1>
    <p>Before we start, please pick a customer:</p>
    {customers.length !== 0
      ? <ul id="customers">
        {customers.map(customer => <li key={customer.id}>
          <Customer customer={customer} />
        </li>)}
      </ul>
      : <p>Sorry, this list is empty.</p>}
  </div>;
};

export default Home;
