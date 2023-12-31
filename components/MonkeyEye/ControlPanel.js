import React, { useState } from 'react';
import Link from 'next/link';
import Knobtest from './Knobtest';
import KnobHeight from './Knob_Height';
import Indicator from './Knob_Indicator';
import styles from "./MonkeyEye.module.css"


export function ControlPanel(props) {
    let obj={pos:{0:50,1:90,2:90,3:0}}
    const [cmd,setCmd]= useState(obj);


    const onCommandChange = (id, value)=>{
        obj = cmd;
        obj.pos[id]=value;
        setCmd(obj);
        props.onChange(cmd);
    }
    return (
    // <section className="services-area bg-f2f6f9 ptb-110">
        <div className={styles.controlArea}>
            <div className={styles.controlPanel}>
                <label className={styles.title}>Control Box</label>
                <div className={styles.controller}>
                    <label className={styles.title}>Control</label>
                    {/* <div class="container">
                        <div class="row"> */}
                            <div className={styles.knobBox}>
                                <KnobHeight onChange={onCommandChange} id={0} value={cmd.pos[0]} label={"height"}/>
                            </div>
                            <div className={styles.knobBox}>
                                <Knobtest onChange={onCommandChange} id={1} value={cmd.pos[1]} label={"length"}/>
                            </div>
                            <div className={styles.knobBox}>
                                <Knobtest onChange={onCommandChange} id={2} value={cmd.pos[2]} label={"theta0"}/>
                            </div>
                            <div className={styles.knobBox}>
                                <Knobtest onChange={onCommandChange} id={3} value={cmd.pos[3]} label={"theta1"}/>
                            </div>
                        {/* </div>
                    </div> */}
                </div>                        
                <div className={styles.indicator}>
                    <label className={styles.title}>indicator</label>
                    <div className={styles.knobBox}>
                        <Indicator value={50}/>
                    </div>
                    <div className={styles.knobBox}>
                        <Indicator value={50}/>
                    </div>
                    <div className={styles.knobBox}>
                        <Indicator value={50}/>
                    </div>
                    <div className={styles.knobBox}>
                        <Indicator value={50}/>
                    </div>
                </div>
            </div>

            {/* <div className={styles.test1}>
            <div className={styles.testItem}>
                    123
                </div>
                <div className={styles.testItem}>
                    123
                </div>
                <div className={styles.testItem}>
                    123
                </div>
                <div className={styles.testItem}>
                    123
                </div>
                <div className={styles.testItem}>
                    123
                </div>
            </div> */}
        </div>


    //     {/* Shape Images */}
    //     {/* <div className="shape-img2">
    //         <img src="/images/shape/shape2.svg" alt="image" />
    //     </div>
    //     <div className="shape-img3">
    //         <img src="/images/shape/shape3.png" alt="image" />
    //     </div>
    //     <div className="shape-img4">
    //         <img src="/images/shape/shape4.svg" alt="image" />
    //     </div>
    //     <div className="shape-img5">
    //         <img src="/images/shape/shape5.svg" alt="image" />
    //     </div>
    //     <div className="shape-img3">
    //         <img src="/images/shape/shape3.png" alt="image" />
    //     </div>
    //     <div className="dot-shape1">
    //         <img src="/images/shape/dot1.png" alt="image" />
    //     </div>
    //     <div className="dot-shape2">
    //         <img src="/images/shape/dot3.png" alt="image" />
    //     </div>
    //     <div className="dot-shape2">
    //         <img src="/images/shape/dot4.png" alt="image" />
    //     </div>
    //     <div className="dot-shape2">
    //         <img src="/images/shape/dot5.png" alt="image" />
    //     </div>
    //     <div className="dot-shape2">
    //         <img src="/images/shape/dot6.png" alt="image" />
    //     </div> */}
    // {/* </section> */}
);
}

export default ControlPanel;