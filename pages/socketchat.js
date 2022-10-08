import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import PageBanner from "../components/Common/PageBanner";
import ServiceDetailsContent from "../components/Services/ServiceDetailsContent";
import SocketChat from "../components/Services/SocketChat";
import Footer from "../components/Layouts/Footer";
const socketchat = () => {
  return (
    <>
      <Header />

      <PageBanner
        pageTitle="Security & Surveillance"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Service Details"
        bgImgClass="item-bg2"
      />



      <Footer />
    </>
  );
};

export default socketchat;
