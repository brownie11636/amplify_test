import React, { Component } from "react";
import Link from "next/link";

export default class Services extends Component {
  render() {
    return (
      <>
        <div className="ai-services-area with-linear-gradient-optional-color pt-100">
          <div className="container">
            <div className="section-title with-underline-text">
              <h2>
                We Offer Professional <b>Solutions</b> With Artificial
                Intelligence
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. A ac, ut
                eget pellentesque nulla viverr.
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-services-card text-center">
                  <div className="image-icon">
                    <img src="/images/home-six/services/icon1.png" alt="icon" />
                  </div>
                  <h3>
                    <Link href="/service-details">
                      <a>Software Engineers</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor consectetur sit amet dipiscing elit sed
                    dosiy eiusmod lorem ipsum dolor.
                  </p>
                  <Link href="/service-details">
                    <a className="read-btn">Read More</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-services-card text-center">
                  <div className="image-icon bg-two">
                    <img src="/images/home-six/services/icon2.png" alt="icon" />
                  </div>
                  <h3>
                    <Link href="/service-details">
                      <a>Data Analysts</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor consectetur sit amet dipiscing elit sed
                    dosiy eiusmod lorem ipsum dolor.
                  </p>
                  <Link href="/service-details">
                    <a className="read-btn">Read More</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-services-card text-center">
                  <div className="image-icon bg-three">
                    <img src="/images/home-six/services/icon3.png" alt="icon" />
                  </div>
                  <h3>
                    <Link href="/service-details">
                      <a>Security & Surveillance</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor consectetur sit amet dipiscing elit sed
                    dosiy eiusmod lorem ipsum dolor.
                  </p>
                  <Link href="/service-details">
                    <a className="read-btn">Read More</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-services-card text-center">
                  <div className="image-icon bg-four">
                    <img src="/images/home-six/services/icon4.png" alt="icon" />
                  </div>
                  <h3>
                    <Link href="/service-details">
                      <a>Health & Manufacturing</a>
                    </Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor consectetur sit amet dipiscing elit sed
                    dosiy eiusmod lorem ipsum dolor.
                  </p>
                  <Link href="/service-details">
                    <a className="read-btn">Read More</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-12 col-md-12">
                <div className="ai-all-services-btn">
                  <Link href="/services">
                    <a className="btn btn-primary">View All Services</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
