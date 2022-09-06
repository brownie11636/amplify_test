import React, { Component } from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import Footer from "../components/Layouts/Footer";
import LoginComponent from "../components/Login/LoginComponent";
import PageBanner from '../components/Common/PageBanner';

export default function Login({}) {

    return (
        <>
        <NavbarTwo />

        <PageBanner 
                    pageTitle="Sign-In" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Sign-In" 
                    bgImgClass="item-bg1" 
        />  
        <LoginComponent />
  
        <Footer />
      </>
    );
}
