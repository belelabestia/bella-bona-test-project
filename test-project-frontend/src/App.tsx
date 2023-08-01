import React, { Dispatch, createContext, useEffect, useState } from 'react';
import './App.sass';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { CustomerModel } from './components/customer/customer';
import Loader from './components/loader/loader';

export const AppContext = createContext(null! as [CustomerModel | null, Dispatch<CustomerModel | null>]);

export const App = () => {
  const [selectedCustomer, selectCustomer] = useState<CustomerModel | null>(null);
  const { state } = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate])

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
