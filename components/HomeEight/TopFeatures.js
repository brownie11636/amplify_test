import React, { Component } from "react";
import Link from "next/link";

export default class TopFeatures extends Component {
  render() {
    return (
      <>
        <div className="top-featured-area pb-70">
          <div className="container">
            <div className="top-featured-inner-box">
              <div className="row justify-content-center">
                <div className="col-lg-3 col-sm-6">
                  <div className="top-featured-card text-center">
                    <div className="image-icon">
                      <img
                        src="/images/home-six/featured/icon1.png"
                        alt="icon"
                      />
                    </div>
                    <h3>
                      <Link href="/service-details">
                        <a>Robotic Automation</a>
                      </Link>
                    </h3>
                    <Link href="/service-details">
                      <a className="learn-btn">Learn More</a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="top-featured-card text-center">
                    <div className="image-icon">
                      <img
                        src="/images/home-six/featured/icon2.png"
                        alt="icon"
                      />
                    </div>
                    <h3>
                      <Link href="/service-details">
                        <a>Machine Learning</a>
                      </Link>
                    </h3>
                    <Link href="/service-details">
                      <a className="learn-btn">Learn More</a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="top-featured-card text-center">
                    <div className="image-icon">
                      <img
                        src="/images/home-six/featured/icon3.png"
                        alt="icon"
                      />
                    </div>
                    <h3>
                      <Link href="/service-details">
                        <a>Cognitive Engagement</a>
                      </Link>
                    </h3>
                    <Link href="/service-details">
                      <a className="learn-btn">Learn More</a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                  <div className="top-featured-card text-center">
                    <div className="image-icon">
                      <img
                        src="/images/home-six/featured/icon4.png"
                        alt="icon"
                      />
                    </div>
                    <h3>
                      <Link href="/service-details">
                        <a>Cognitive Automation</a>
                      </Link>
                    </h3>
                    <Link href="/service-details">
                      <a className="learn-btn">Learn More</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
