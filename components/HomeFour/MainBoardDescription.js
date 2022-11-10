import React, { Component } from 'react';

class MainBoardDescription extends Component {
    render() {
        return (
            <section className="about-area ptb-110">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img src="/images/about/about1.jpg" alt="image" />
                                <img src="/images/about/about2.jpg" alt="image" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">

                            <div className="about-content"> 
                                <div className="row">
                                    <div className="about-text">
                                        <h3>로봇 텔레오퍼레이션</h3>
                                        Robot Teleoperation
                                        <p>
                                            로봇은 아직 인간의 창의적인 판단력을 필요로 합니다. <br/>
                                            자동화가 불가능하지만 로봇은 필요할 때, 여기 우리가 있어요.
                                        </p>
                                        <p/>
                                    </div>
                                    <div className="about-text">
                                        <h3>온라인 센서시스템</h3> Online Sensor System
                                        <p>
                                            다양한 센서를 IoT시스템으로 통합하여 간편하게 관리할 수 있습니다.<br/>
                                            문의주시면 방법을 알려드릴게요.
                                        </p>
                                        <p/>
                                    </div>
                                    <div className="about-text">
                                        <h3>너드 개발자들</h3> We Nerd-developers
                                        <p>
                                            창업은 했는데 돈 벌 생각은 안하는 너드들. <br/>
                                            "이상하다.. 왜 안망하지?" 
                                            지원해주신 분들께 감사드립니다..!
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                {/* Shape Images */}
                {/* <div className="shape-img1">
                    <img src="/images/shape/shape1.png" alt="image" />
                </div>
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
                <div className="shape-img6">
                    <img src="/images/shape/shape6.png" alt="image" />
                </div>
                <div className="dot-shape1">
                    <img src="/images/shape/dot1.png" alt="image" />
                </div>
                <div className="dot-shape2">
                    <img src="/images/shape/dot2.png" alt="image" />
                </div> */}
            </section>
        );
    }
}

export default MainBoardDescription;