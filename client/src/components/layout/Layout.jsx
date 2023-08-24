import React from 'react';
import Routers from '../../routes/Routers';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="absolute top-[130px] w-full flex items-center flex-col overflow-hidden">
        <div className="w-[1024px] ">
          <Routers />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
