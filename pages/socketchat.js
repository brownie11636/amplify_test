import React, { Component } from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import ServiceDetailsContent from "../components/Services/ServiceDetailsContent";
import SocketChat from "../components/Services/SocketChat";
import Footer from "../components/Layouts/Footer";
const socketchat = () => {
  return (
    <>
      <NavbarTwo />

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
