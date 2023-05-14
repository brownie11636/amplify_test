import React, { Component } from 'react';
import Header from "../components/Layouts/Header";
import PageBanner from '../components/Common/PageBanner';
import PartnerContent from '../components/Common/PartnerContent';
import Footer from '../components/Layouts/Footer';
// import PartnerSlider from '../components/Common/PartnerSlider';

class Partner extends Component {
    render() {
        return (
            <>
                <Header />

                <PageBanner 
                    pageTitle="Partner" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Partner" 
                    bgImgClass="item-bg2" 
                />  

                <PartnerContent />

                {/* <PartnerSlider /> */}
                
                <Footer/>
            </>
        );
    }
}

export default Partner;