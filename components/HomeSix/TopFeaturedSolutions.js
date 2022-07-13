import React, { Component } from "react";
import Link from "next/link";

export default class TopFeaturedSolutions extends Component {
  render() {
    return (
      <>
        <div className="top-featured-area pt-100 pb-70">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 col-sm-6">
                <div className="top-featured-content">
                  <h2>
                    Our top <span>Featured</span> Solutions
                  </h2>
                  <p>
                    Lorem ipsum dolor sit am adipiscing elit sed do eiusmod.
                  </p>

                  <div className="featured-btn">
                    <Link href="/contact">
                      <a className="btn btn-primary">Get Started Free</a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="top-featured-card text-center">
                  <div className="image-icon">
                    <img src="/images/home-six/featured/icon1.png" alt="icon" />
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
                    <img src="/images/home-six/featured/icon2.png" alt="icon" />
                  </div>
                  <h3>
                    <a href="single-services.html">Machine Learning</a>
                  </h3>
                  <Link href="/service-details">
                    <a className="learn-btn">Learn More</a>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="top-featured-card text-center">
                  <div className="image-icon">
                    <img src="/images/home-six/featured/icon3.png" alt="icon" />
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
            </div>
          </div>
        </div>
      </>
    );
  }
}
