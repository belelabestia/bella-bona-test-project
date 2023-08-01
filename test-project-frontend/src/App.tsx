import React, { createContext, useState } from 'react';
import './App.sass';
import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { CustomerModel } from './components/customer/customer';

type AppContextModel = {
  customers: CustomerModel[];
  selectedCustomer: CustomerModel | null;
  selectCustomer: React.Dispatch<React.SetStateAction<CustomerModel | null>>;
};

export const CustomerContext = createContext<AppContextModel>({
  customers: [],
  selectedCustomer: null,
  selectCustomer: () => { throw new Error("set a valid selectCustomer function"); }
});

export const App = () => {
  const customers = useLoaderData() as CustomerModel[];
  const [selectedCustomer, selectCustomer] = useState<CustomerModel | null>(null);

  return <div id="app">
    <CustomerContext.Provider value={{ customers, selectedCustomer, selectCustomer }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </CustomerContext.Provider>
    <Footer />
  </div >;
};

export default App;
