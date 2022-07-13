import React, { Component } from 'react'
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    mouseDrag: true,
    animateOut: 'fadeOut',
    items: 1,
    navText: [
        "<i class='flaticon-left-chevron'></i>",
        "<i class='flaticon-right-chevron'></i>"
    ],
}

export default class Testimonials extends Component {
    _isMounted = false;
    state = {
        display:false
    }
    componentDidMount(){ 
        this._isMounted = true;
        this.setState({ display: true }) 
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
  render() {
    return (
      <>
          <div className="unique-testimonials-section ptb-110">
            <div className="container">
                {this.state.display ? <OwlCarousel 
                className="unique-testimonials-slides owl-carousel owl-theme"
                    {...options}
                >
                    <div className="unique-testimonials-box">
                        <span className="sub-title">EXCILENT WORK DONE BY BARITON!</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit nulla faucibus pulvinar iaculis et eu arcu mauris euismod duis diam nunc ultrices blandit montes quis id erat diam non rhoncus cras elit.</p>
                        <div className="client-info">
                            <h3>Thomas Adbadon</h3>
                            <span>Global Head of Operations - Techxol LTD.</span>

                            <div className="image">
                                <img src="/images/author1.jpg" className="rounded-circle" alt="image" />
                            </div>
                        </div>

                        <div className="testimonials-shape-1">
                            <img src="/images/home-seven/testimonials-shape-1.png" alt="image" />
                        </div>
                        <div className="testimonials-shape-2">
                            <img src="/images/home-seven/testimonials-shape-2.png" alt="image" />
                        </div>
                    </div>

                    <div className="unique-testimonials-box">
                        <span className="sub-title">EXCILENT WORK DONE BY BARITON!</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit nulla faucibus pulvinar iaculis et eu arcu mauris euismod duis diam nunc ultrices blandit montes quis id erat diam non rhoncus cras elit.</p>
                        <div className="client-info">
                            <h3>John Smith</h3>
                            <span>Web Developer</span>

                            <div className="image">
                                <img src="/images/author2.jpg" className="rounded-circle" alt="image" />
                            </div>
                        </div>

                        <div className="testimonials-shape-1">
                            <img src="/images/home-seven/testimonials-shape-1.png" alt="image" />
                        </div>
                        <div className="testimonials-shape-2">
                            <img src="/images/home-seven/testimonials-shape-2.png" alt="image" />
                        </div>
                    </div>

                    <div className="unique-testimonials-box">
                        <span className="sub-title">EXCILENT WORK DONE BY BARITON!</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit nulla faucibus pulvinar iaculis et eu arcu mauris euismod duis diam nunc ultrices blandit montes quis id erat diam non rhoncus cras elit.</p>
                        <div className="client-info">
                            <h3>Camile Taylor</h3>
                            <span>Desginer</span>

                            <div className="image">
                                <img src="/images/author3.jpg" className="rounded-circle" alt="image" />
                            </div>
                        </div>

                        <div className="testimonials-shape-1">
                            <img src="/images/home-seven/testimonials-shape-1.png" alt="image" />
                        </div>
                        <div className="testimonials-shape-2">
                            <img src="/images/home-seven/testimonials-shape-2.png" alt="image" />
                        </div>
                    </div>
                </OwlCarousel> : ''}
            </div>
        </div>
      </>
    )
  }
}
