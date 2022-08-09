import React, { Component } from 'react';
import Link from 'next/link';
import NavbarTwo from '../components/Layouts/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import Footer from '../components/Layouts/Footer';


//import styles from "../styles/Chat.module.css";


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


class ServicesFour extends Component {
    render() {
        return (
            <>
                <NavbarTwo />
                
                <div>
                    
                </div>
             
                <Footer />
            </>
        );
    }
}

export default ServicesFour;