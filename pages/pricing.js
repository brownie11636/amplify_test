import React, { Component } from 'react';
import Header from "../components/Layouts/Header";
import PageBanner from '../components/Common/PageBanner';
import PricingCard from '../components/Pricing/PricingCard';
import Footer from '../components/Layouts/Footer';

class Pricing extends Component {
    render() {
        return (
            <>
                <Header />

                <PageBanner 
                    pageTitle="Our Pricing" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Pricing" 
                    bgImgClass="item-bg3" 
                />  

                <PricingCard />
                
                <Footer />
            </>
        );
    }
}

export default Pricing;