import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import RegistrationRoot from "../components/Registration/RegistrationRoot";
import PageBanner from '../components/Common/PageBanner';

export default function Registration({}) {

    return (
        <>
        <Header />
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
