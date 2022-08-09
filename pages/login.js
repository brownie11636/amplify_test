import React, { Component } from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import MainLogin from "../components/Login/MainLogin";
import LoginComponent from "../components/Login/LoginComponent";

export default function Login({}) {

    return (
        <>
        <NavbarTwo />

        
        <LoginComponent />
  
        <Footer />
      </>
    );
}
