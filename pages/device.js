import React, { Component } from 'react';
import NavbarTwo from '../components/Layouts/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
// import FaqContent from '../components/Faq/FaqContent';
import Footer from '../components/Layouts/Footer';
import DeviceAdd from '../components/Device/DeviceAdd';

class Device extends Component {
    render() {
        return (
            <>
                <NavbarTwo />

                <PageBanner 
                    pageTitle="Device List" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Device" 
                    bgImgClass="item-bg1" 
                /> 

                <DeviceAdd />
                
                <Footer />
            </>
        );
    }
}

export default Device;