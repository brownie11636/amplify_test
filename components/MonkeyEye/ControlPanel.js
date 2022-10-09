import React, { Component, useState } from 'react';
import Link from 'next/link';
import DonutKnob from './DonutKnob';

class ControlPanel extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <section className="services-area bg-f2f6f9 ptb-110">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className='panel'>
                                    <div className="icon">
                                        <i className="flaticon-income"></i>
                                    </div>
                                </div>
                                <h3>

                                </h3>
                                <p>Under Construction</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            {/* <div className="controller">
                                <div className="knob-box">
                                    <DonutKnob/>
                                </div>
                                <div className="knob-box">
                                    <DonutKnob/>
                                </div>
                                <div className="knob-box">
                                    <DonutKnob/>
                                </div>
                            </div>
                            <div className="indicator">
                            <div className="knob-box">
                                    <DonutKnob/>
                                </div>
                                <div className="knob-box">
                                    <DonutKnob/>
                                </div>
                                <div className="knob-box">
                                    <DonutKnob/>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Shape Images */}
                <div className="shape-img2">
                    <img src="/images/shape/shape2.svg" alt="image" />
                </div>
                <div className="shape-img3">
                    <img src="/images/shape/shape3.png" alt="image" />
                </div>
                <div className="shape-img4">
                    <img src="/images/shape/shape4.svg" alt="image" />
                </div>
                <div className="shape-img5">
                    <img src="/images/shape/shape5.svg" alt="image" />
                </div>
                <div className="shape-img3">
                    <img src="/images/shape/shape3.png" alt="image" />
                </div>
                <div className="dot-shape1">
                    <img src="/images/shape/dot1.png" alt="image" />
                </div>
                <div className="dot-shape2">
                    <img src="/images/shape/dot3.png" alt="image" />
                </div>
                <div className="dot-shape2">
                    <img src="/images/shape/dot4.png" alt="image" />
                </div>
                <div className="dot-shape2">
                    <img src="/images/shape/dot5.png" alt="image" />
                </div>
                <div className="dot-shape2">
                    <img src="/images/shape/dot6.png" alt="image" />
                </div>
            </section>
        );
    }
}

export default ControlPanel;