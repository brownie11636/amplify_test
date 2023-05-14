import React, { Component } from 'react';
import Header from "../components/Layouts/Header";
import PageBanner from '../components/Common/PageBanner';
import ServicesContent from '../components/Services/ServicesContent';
// import FeedbackSlider from '../components/Common/FeedbackSlider';
import Footer from '../components/Layouts/Footer';

class Services extends Component {
    render() {
        return (
            <>
                <Header />

                <PageBanner 
                    pageTitle="Services" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Services" 
                    bgImgClass="item-bg1" 
                />  

                <ServicesContent />

                {/* <FeedbackSlider /> */}
                
                <Footer />
            </>
        );
    }
}

export default Services;