import React, { Component } from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import MainLogin from "../components/Login/MainLogin";


export default function Login({}) {

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
        
        <MainLogin />

  
        <Footer />
      </>
    );
}
