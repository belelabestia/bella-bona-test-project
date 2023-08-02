import React, { Dispatch, createContext, useEffect, useState } from 'react';
import './app.sass';
import { Outlet, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { CustomerModel } from "./types/customer-model";
import Loader from './components/loader/loader';

export const AppContext = createContext(null! as [CustomerModel | null, Dispatch<CustomerModel | null>]);

export const App = () => {
  const [selectedCustomer, selectCustomer] = useState<CustomerModel | null>(null);
  const { id: customerId } = useParams();
  const { state } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === ""
    ) navigate("/home");
  }, [navigate, location]);

  useEffect(() => {
    if (customerId !== undefined)
      fetch(`/api/customer/${customerId}`)
        .then(res => res.json())
        .then(customer => selectCustomer(customer));
  }, [customerId]);

  return <div id="app">
    <AppContext.Provider value={[selectedCustomer, selectCustomer]}>
      <Header />
      <main>
        {state === "loading"
          ? <Loader />
          : <Outlet />}
      </main>
    </AppContext.Provider>
    <Footer />
  </div>;
};

export default App;
