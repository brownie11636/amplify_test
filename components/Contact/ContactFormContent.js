import React, { Component } from 'react';
import Link from 'next/link';
import ContactForm from './ContactForm';

class ContactFormContent extends Component {
    render() {
        return (
            <section className="contact-area ptb-110">
                <div className="container">
                    <div className="section-title">
                        <span>Message Us</span>
                    </div>

                    <div className="contact-form">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-12">
                                <div className="contact-image">
                                    <img src="/images/contact.png"  alt="image" />
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-12">
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="contact-info">
                        <div className="contact-info-content">
                            <h3>Contact us by Phone Number or Email Address</h3>
                            <h2>
                                <span className="number">+082 010 5609 9527</span>
                                <span className="or">OR</span>
                                <span className="email">jangjun_park@portal301</span>
                            </h2>

                            <ul className="social">
                                <li>
                                    <a href="https://twitter.com/" target="_blank">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/" target="_blank">
                                        <i className="fab fa-youtube"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/" target="_blank">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" target="_blank">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ContactFormContent;