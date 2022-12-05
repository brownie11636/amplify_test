import React, { Component } from 'react';
// import NavbarTwo from '../components/Layouts/NavbarTwo';
import Header from '../components/Layouts/Header';
import MainBanner from '../components/HomeFour/MainBanner';
import MainBoardWebRTC from '../components/HomeFour/MainBoardWebRTC';
import About from '../components/HomeFour/About';
import Services from '../components/HomeFour/Services';
import Webinar from '../components/HomeFour/Webinar';
import PartnerContent from '../components/Common/PartnerContent';
import FeedbackSlider from '../components/Common/FeedbackSlider';
import PricingCard from '../components/Common/PricingCard';
import BlogPost from '../components/Common/BlogPost';
import FreeTrialForm from '../components/Common/FreeTrialForm';
import Footer from '../components/Layouts/Footer';
import MainBoardDescription from '../components/HomeFour/MainBoardDescription';

//index4
class Index extends Component {
    render() {
        return (
            <>
                <Header/>
                <MainBoardDescription/>
                {/* <Services /> */}
                {/* <MainBoardWebRTC /> */}
                {/* <Webinar /> */}
                {/* <About /> */}
                {/* <PartnerContent /> */}
                {/* <FeedbackSlider /> */}
                {/* <BlogPost /> */}
                <Footer />
            </>
        );
    }
}

export default Index;