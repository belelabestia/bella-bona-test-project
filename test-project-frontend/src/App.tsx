import React from 'react';
import './App.sass';
import { Outlet } from 'react-router-dom';
import Header from './design/header/header';
import Footer from './design/footer/footer';

export const App = () => <div className="app">
  <Header />
  <main>
    <Outlet />
  </main>
  <Footer />
</div>;

export default App;
