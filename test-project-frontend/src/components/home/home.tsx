import { useLoaderData } from "react-router-dom";
import "./home.sass";

type Customer = {

};

export const customersLoader = () => fetch("api/customer").then(res => res.json());

export const Home = () => {
  const customers = useLoaderData() as Customer[];

  return <div id="home">
    <h1>Hello!</h1>
    <p>Let's see what customers we have:</p>
    <pre>
      {JSON.stringify(customers)}
    </pre>
  </div>;
};

export default Home;
