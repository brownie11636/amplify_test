import React, { Component } from 'react';
import Header from '../components/Layouts/Header';
import PageBanner from '../components/Common/PageBanner';
import Testimonials from '../components/HomeTwo/Testimonials';
import FeedbackSlider from '../components/Common/FeedbackSlider';
import CustomerFeedback from '../components/HomeFive/CustomerFeedback';
import Footer from '../components/Layouts/Footer';

class Feedback extends Component {
    render() {
        return (
            <>
                <Header />

                <PageBanner 
                    pageTitle="Feedback" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Feedback" 
                    bgImgClass="item-bg3" 
                />  

                <Testimonials />

                <FeedbackSlider />

                <CustomerFeedback />
                
                <Footer/>
            </>
        );
    }
}

export default Feedback;