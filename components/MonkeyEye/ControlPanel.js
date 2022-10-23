import React, { useState } from 'react';
import Link from 'next/link';
import Knobtest from './Knobtest';

export function ControlPanel(props) {
    
    const onChange = (value)=>{
        props.onChange(value);
        console.log("panel:",value);
    }
    return (
    <section className="services-area bg-f2f6f9 ptb-110">
        <div className="control-panel">
            <div className="controller">
                <label className="title">Control</label>
            
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={50} label={"height"}/>
                </div>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={80} label={"length"}/>
                </div>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={90} label={"theta0"}/>
                </div>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={90} label={"theta1"}/>
                </div>
            </div>
            <div className="indicator">
                <section>
                    <label className="title">indicator</label>
                </section>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={50}/>
                </div>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={50}/>
                </div>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={50}/>
                </div>
                <div className="knob-box">
                    <Knobtest onChange={onChange} value={50}/>
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

export default ControlPanel;