import React from 'react';
import './App.sass';
import { Link, Outlet } from 'react-router-dom';

export const App = () => <>
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="customer/1/products">Products</Link></li>
        <li><Link to="customer/1/orders">Orders</Link></li>
      </ul>
    </nav>
  </header>
  <main>
    <Outlet />
  </main>
  <footer>Footer</footer>
</>;

export default App;
