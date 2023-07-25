import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import MainBoardDescription from "../components/Home/MainBoardDescription";

//index4
class Index extends Component {
  render() {
    return (
      <>
        <Header />
        <MainBoardDescription />
        <Footer />
      </>
    );
  }
}

export default Index;
