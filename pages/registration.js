import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import Footer from "../components/Layouts/Footer";
import RegistrationRoot from "../components/Registration/RegistrationRoot";
import PageBanner from '../components/Common/PageBanner';

export default function Registration({}) {

    return (
        <>
        <NavbarTwo />
        <PageBanner 
                    pageTitle="Registration" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Registration" 
                    bgImgClass="item-bg1" 
        />  
        <RegistrationRoot />
        <Footer />
      </> 
    );
}
