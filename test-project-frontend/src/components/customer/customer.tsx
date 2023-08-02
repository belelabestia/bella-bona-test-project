import { useContext } from "react";
import "./customer.sass";
import { AppContext } from "../../app";
import { CustomerModel } from "../../types/customer-model";

type Props = { customer: CustomerModel; }

export const Customer = ({ customer }: Props) => {
  const [, selectCustomer] = useContext(AppContext);
  return <button onClick={() => selectCustomer(customer)}>{customer.name}</button>
};

export default Customer;
