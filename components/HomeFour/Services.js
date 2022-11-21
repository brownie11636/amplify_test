import React, { Component } from 'react';
import Link from 'next/link';
const { v4: uuidv4 } = require("uuid");

const roomid = uuidv4()

class ServicesContent extends Component {


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
                                    {/* <Link href={{
                                        pathname: `/socketchat/${roomid}`,
                                        query: {
                                            query_roomid: `${roomid}`,
                                        }
                                    }}> */}
                                    <Link href={`/socketchat/${uuidv4()}`}>
                                        <a>Socket Chat</a>
                                    </Link>
                                </h3>
                                <p>Under Construction</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className='panel'>
                                    <div className="icon">
                                        <i className="flaticon-automatic"></i>
                                    </div>
                                </div>
                                <h3>
                                    <Link href="/sensorIoT">
                                        <a>Sensor IoT</a>
                                    </Link>
                                </h3>
                                <p>Online Sensor Management</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className='panel'>
                                    <div className="icon">
                                        <Link href="/mediasoup">
                                            <i className="flaticon-automatic"></i>
                                        </Link>
                                    </div>
                                    <div className="option">
                                        <div className="btn-box">
                                            <div>
                                                <Link href="/mediasoup/publish">
                                                    <a className="btn btn-primary">Publish</a>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link href="/mediasoup/subscribe">
                                                    <a className="btn btn-primary">Subscribe</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <h3>
                                    <Link href="/mediasoup">
                                        <a>MediaSoup</a>
                                    </Link>
                                </h3>
                                <p>Prototyping on mediasoup</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className='panel'>
                                    <div className="icon">
                                        <Link href="/mediasoup">
                                            <i className="flaticon-automatic"></i>
                                        </Link>
                                    </div>
                                    <div className="option">
                                        <div className="btn-box">
                                            <div>
                                                <Link href="/webrtc/cast">
                                                    <a className="btn btn-primary">Start Stream</a>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link href="/webrtc/view">
                                                    <a className="btn btn-primary">View Stream</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <h3>
                                    <Link href="/webrtc">
                                        <a>WebRTC</a>
                                    </Link>
                                </h3>
                                <p>Basic WebRTC</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className='panel'>
                                    <div className="icon">
                                        <i className="flaticon-locked"></i>
                                    </div>
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>TeleSyncArm</a>
                                    </Link>
                                </h3>
                                <p>Robot Arm Teleoperation</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className='panel'>
                                    <div className="icon">
                                    <Link href="/service-details">
                                            <i className="flaticon-locked"></i>
                                    </Link>
                                    </div>
                                    <div className="option">
                                        <div className="btn-box">
                                            <div>
                                                <Link href="/webrtc/cast">
                                                    <a className="btn btn-primary">Enroll Robot</a>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link href="/monkey-eye/operate">
                                                    <a className="btn btn-primary">Operate Robot</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>





                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Monkey-Eye</a>
                                    </Link>
                                </h3>
                                <p>Camera Robot Teleoperation</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shape Images */}
                {/* <div className="shape-img2">
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
                </div> */}
            </section>
        );
    }
}

export default ServicesContent;