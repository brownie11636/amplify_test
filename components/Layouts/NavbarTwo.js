import React, { Component, useState, useEffect } from 'react';
import Link from '../../utils/ActiveLink';
import { useCookies } from 'react-cookie';

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(true)
    const [isLogin, setIsLogin] = useState(false)
    let _isMounted = false;

    const [cookies, setCookie] = useCookies(['id']);
    
    // Navbar
    const toggleNavbar = () => {
        setCollapsed((currnet) => {return !currnet})
    }

    useEffect(() => {

        if (cookies.id !== 'undefined') {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

        let elementId = document.getElementById("navbar");
        elementId.classList.add("is-sticky");
        // document.addEventListener("scroll", () => {
        //     if (window.scrollY > 170) {
        //         elementId.classList.add("is-sticky");
        //         console.log('add sticky')
        //     } else {
        //         elementId.classList.add("is-sticky");
        //         console.log('remove sticky')
        //     }
        // });
        return () => {
            _isMounted = false;
        };
    }, []);

    
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';


        return (
            <>
               <div id="navbar" className="navbar-area">
                    <div className="main-nav">
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <img src="/images/main_logo3.png" className="main-logo" alt="logo" />
                                        <img src="/images/main_logo3.png" className="optional-logo" alt="logo" />
                                    </a>
                                </Link>

                                <button 
                                    onClick={toggleNavbar} 
                                    className={classTwo}
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#navbarSupportedContent" 
                                    aria-controls="navbarSupportedContent" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar top-bar"></span>
                                    <span className="icon-bar middle-bar"></span>
                                    <span className="icon-bar bottom-bar"></span>
                                </button>

                                <div className={classOne} id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                                    <Link href="/" activeClassName="active">
                                                        <a className="nav-link">Home</a>
                                                    </Link>
                                        </li>

                                        <li className="nav-item">
                                                    <Link href="/about" activeClassName="active">
                                                        <a className="nav-link">About Us</a>
                                                    </Link>
                                        </li>

                                        <li className="nav-item">
                                                    <Link href="/services" activeClassName="active">
                                                        <a className="nav-link">Services</a>
                                                    </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/contact" activeClassName="active">
                                                <a className="nav-link">Contact</a>
                                            </Link>
                                        </li>
                                        {!isLogin? 
                                        <li className="nav-item">
                                        <Link href="/login" activeClassName="active">
                                            <a className="nav-link">Log In</a>
                                        </Link>
                                        </li>:
                                        <li className="nav-item">
                                        <Link href="/logout" activeClassName="active">
                                            <a className="nav-link">Log Out</a>
                                        </Link>
                                        </li>}
                                    </ul>
                                    <div className="others-options">
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    
}
