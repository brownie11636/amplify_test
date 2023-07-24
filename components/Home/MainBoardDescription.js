import { useRouter } from "next/router";
import React, { Component } from "react";

class MainBoardDescription extends Component {
  render() {
    return (
      <section className="about-area ptb-110">
        <div className="container">
          <div className="row align-items-center">
            {/* <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img src="/images/about/about1.jpg" alt="image" />
                                <img src="/images/about/about2.jpg" alt="image" />
                            </div>
                        </div> */}

            {/* <div className="col-lg-6 col-md-12"> */}

            <div className="about-content">
              <div className="row">
                <div className="about-text">
                  <h2>
                    누구나, 언제, 어디서나, <br />
                    안전하고 손쉬운 로봇 활용
                    {/* 이부분 h3는 너무 작고 h2는 너무 큰거같음 */}
                  </h2>
                  {/* 문구 좀 고치고 싶음 ㅎ */}
                  <h4>
                    전문가의 영역이었던 로봇 제어, <br />
                    첨단 XR 기술을 통해 손쉽게 만나보세요.
                  </h4>
                  <p>
                    로봇은 아직 인간의 창의적인 판단력을 필요로 합니다. <br />
                    자동화가 불가능하지만 로봇은 필요할 때, XR 기술을 통해 손쉽게 제어할 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
            {/* </div> */}

            {/* <div className="col-lg-6 col-md-12"> */}
            <div className="about-content">
              {/* <div className="row"> */}
              <div className="about-text">
                <br />
                <br />
                <br />
                <br />
                <h3>다음과 같은 기술들을 이용해 원격 제어 시스템을 제공합니다.</h3>
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <img src="/images/about/telepresence.png" alt="image" />
                    <h4>3D telepresence</h4>
                    <p>
                      {" "}
                      스테레오 비전 시스템을 통해 입체적인 시야를 제공합니다. <br />
                      이를 통해 현장을 생생하게 느껴 효율적인 작업활동이 용이합니다.{" "}
                    </p>
                    <p />
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <img
                      src="/images/about/teleoperated robot.png"
                      alt="image"
                      style={{ paddingTop: 0 }}
                    />
                    <h4>원격제어 로봇</h4>
                    <p>
                      {" "}
                      초저지연 통신을 통해 사용자의 모션에 위화감 없이 동기화됩니다.
                      <br />
                      위험하거나 멀리있는 현장의 노동자를 대체합니다.
                    </p>
                    <p />
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <img src="/images/about/gesture interface.png" alt="image" />
                    <h4>제스처 기반 인터페이스</h4>
                    <p> 직관적인 인터페이스를 통해 손쉽게 로봇을 제어할 수 있습니다. </p>
                    <p />
                  </div>
                </div>
              </div>

              {/* <div className="about-text">
                                    <br/>
                                    <br/>

                                    <h3>사회노동문제를 해결하고자 합니다.</h3>
                                    <br/>

                                    <h4>인구구조로 인한 노동력 감소</h4>

                                    <p> 노동인구의 감소<br/>
                                        전문교육을 받지 않은 사람들도 손쉽게 사용할 수 있어야함<br/>
                                        노동인구가 줄면 전문가도 줄어들거 아니냐<br/>
                                        전문가 부족 얘기도 녹여야함 </p>
                                    <p/>

                                    <h4>자동화 불가 영역의 원격 노동</h4>
                                    <p> 단순하게 여겨지지만 자동화가 어려운 다양한 수작업 영역들이 존재합니다.<br/>
                                        위험하거니 멀리있는 현장, 포탈 301의 원격 시스템을 통해 ~~하겠습니다.<br/>
                                        단순하게 여겨지지만 자동화가 어려운 다양한 수작업 영역의 노동자도 부족해진다.</p>
                                    <p/>

                                </div> */}
              {/* </div> */}
            </div>
          </div>
          {/* </div> */}
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
