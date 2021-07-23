import React from "react";
import Header from "../header/Header";
// import AlertBar from "../layouts/AlertBar";
import Footer from "../layouts/Footer";
import Todos from "../todos/Todos";
import "./Container.scss";

const Container = () => {
  return (
    <div className="container">
      <Header />

      <Todos />
      <Footer />
    </div>
  );
};

export default Container;
