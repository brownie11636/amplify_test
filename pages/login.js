import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import LoginComponent from "../components/Login/LoginComponent";
import PageBanner from '../components/Common/PageBanner';

export default function Login({}) {

    return (
      <>
        <Header />

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
