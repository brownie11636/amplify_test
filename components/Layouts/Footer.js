import React, { Component } from 'react';
import Link from 'next/link';

class Footer extends Component {
    render() {

        let currentYear = new Date().getFullYear();

        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <div className="logo">
                                    <a href="/">
                                        <img src="/images/main_logo.png" alt="image" />
                                    </a>
                                    
                                </div>

                                <ul className="social">
                                    <li> 
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <i className="flaticon-facebook-letter-logo"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/" target="_blank">
                                            <i className="flaticon-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/" target="_blank">
                                            <i className="flaticon-instagram-logo"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/" target="_blank">
                                            <i className="flaticon-youtube-play-button"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                        {/* <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h3>Services</h3>

                                <ul className="footer-services-list">
                                    <li>
                                        <Link href="/service-details">
                                            <a>Product Engineering</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>UX/UI Design</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>Big Data Analysis</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>Desktop Applications</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/service-details">
                                            <a>Mobile Applications</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                        {/* <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-footer-widget">
                                <h3>Quick Links</h3>

                                <ul className="quick-links-list">
                                    <li>
                                        <Link href="/about">
                                            <a>About Us</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog">
                                            <a>Blog</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>Contact</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services">
                                            <a>Services</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/pricing">
                                            <a>Pricing</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                        <div className="col-md-12">
                            <div className="single-footer-widget">

                                <div className="footer-contact-list">
                                    <div className="title">Contacts</div>
                                    <div className="info">Email: jangjun_park@portal301.com</div> 
                                    <div className="info">Phone: +82 10-5609-9527</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-area">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* <div className="col-lg-6 col-md-6 col-sm-6">
                                <p>Copyright &copy;{currentYear} Bariton. All Rights Reserved <a href="https://envytheme.com/" target="_blank">EnvyTheme</a>.</p>
                            </div> */}

                            <div className="col-md-12">
                                <ul>
                                    {/* <li>
                                        <Link href="/">
                                            <a>Privacy Policy</a>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link href="/">
                                            <a>PORTAL301 Co.,Ltd.</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="circle-map">
                    <img src="/images/circle-map.png" alt="image" />
                </div>

                <div className="lines">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div> */}
            </footer>
        );
    }
}

export default Footer;