import { useContext } from "react";
import { CustomerContext } from "../../App";

export type CustomerModel = {
  id: number;
  name: string;
};

type Props = {
  customer: CustomerModel;
}

export const Customer = ({ customer }: Props) => {
  const { selectCustomer } = useContext(CustomerContext);

  return <div className="customer">
    <button onClick={() => selectCustomer(customer)}>{customer.name}</button>
  </div>;
};

export default Customer;
