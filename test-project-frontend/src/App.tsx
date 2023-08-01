import React from 'react';
import './App.sass';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';

export const App = () => <div id="app">
  <Header />
  <main>
    <Outlet />
  </main>
  <Footer />
</div>;

export default App;
