import React from "react";
import Header from "../ components/header/Header";
import HomePage from "../pages/HomePage";

const Layout = () => {
  return (
    <>
      <Header />
      <main id="main">
        <HomePage />
      </main>
    </>
  );
};

export default Layout;
