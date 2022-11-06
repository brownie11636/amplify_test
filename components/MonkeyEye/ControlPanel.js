import React, { useState } from 'react';
import Link from 'next/link';
import Knobtest from './Knobtest';
import Indicator from './Knob_Indicator';

export function ControlPanel(props) {
    let obj={arm:{0:50,1:90,2:90,3:0}}
    const [cmd,setCmd]= useState(obj);


    const onCommandChange = (id, value)=>{
        obj = cmd;
        obj.arm[id]=value;
        setCmd(obj);
        props.onChange(cmd);
    }
    return (
    <section className="services-area bg-f2f6f9 ptb-110">
        <div className="control-area">
            <div className="control-panel">
                <label className="title">Control Box</label>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="controller">
                                <label className="title">Control</label>
                                <div className="knob-box">
                                    <Knobtest onChange={onCommandChange} id={0} value={cmd.arm[0]} label={"height"}/>
                                </div>
                                <div className="knob-box">
                                    <Knobtest onChange={onCommandChange} id={1} value={cmd.arm[1]} label={"length"}/>
                                </div>
                                <div className="knob-box">
                                    <Knobtest onChange={onCommandChange} id={2} value={cmd.arm[2]} label={"theta0"}/>
                                </div>
                                <div className="knob-box">
                                    <Knobtest onChange={onCommandChange} id={3} value={cmd.arm[3]} label={"theta1"}/>
                                </div>
                            </div>                        
                        </div>                        
                        <div className="col-lg-4">
                            <div className="indicator">
                                <label className="title">indicator</label>
                                <div className="knob-box">
                                    <Indicator value={50}/>
                                </div>
                                <div className="knob-box">
                                    <Indicator value={50}/>
                                </div>
                                <div className="knob-box">
                                    <Indicator value={50}/>
                                </div>
                                <div className="knob-box">
                                    <Indicator value={50}/>
                                </div>
                            </div>
                        </div>
                    </div>
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