import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-6">
        <div>
          <Outlet />
         
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
