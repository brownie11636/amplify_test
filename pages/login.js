import React, { Component } from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import MainLogin from "../components/Login/MainLogin";
import LoginPage from "../components/Login/LoginPage";


export default function Login({}) {

    return (
        <>
        <NavbarTwo />

        
        <LoginPage />
  
        <Footer />
      </>
    );
}
