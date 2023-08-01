import { useContext } from "react";
import "./customer.sass";
import { AppContext } from "../../App";

export type CustomerModel = {
  id: number;
  name: string;
};

type Props = {
  customer: CustomerModel;
}

export const Customer = ({ customer }: Props) => {
  const [, selectCustomer] = useContext(AppContext);
  return <button onClick={() => selectCustomer(customer)}>{customer.name}</button>
};

export default Customer;
