import React, { Component } from 'react';
import Header from '../components/Layouts/Header';
import PageBanner from '../components/Common/PageBanner';
import FaqContent from '../components/Faq/FaqContent';
import Footer from '../components/Layouts/Footer';

class Faq extends Component {
    render() {
        return (
            <>
                <Header />

                <PageBanner 
                    pageTitle="Frequently Asked Questions" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Faq" 
                    bgImgClass="item-bg1" 
                />  

                <FaqContent />
                
                <Footer />
            </>
        );
    }
}

export default Faq;