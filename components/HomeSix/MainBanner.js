import React, { Component } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(() => import("react-modal-video"), {
  ssr: false,
});

export default class MainBanner extends Component {
  state = {
    isOpen: false,
  };
  openModal = () => {
    this.setState({ isOpen: true });
  };
  render() {
    return (
      <>
        {/* If you want to change the video need to update below videoID */}
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId="_ysd-zHamjk"
          onClose={() => this.setState({ isOpen: false })}
        />

        <div className="ai-main-banner-area">
          <div className="container-fluid">
            <div className="ai-main-banner-content">
              <h1>
                AI and Machine <span>Learning</span> Products Creators
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <ul className="banner-btn">
                <li>
                  <Link href="/contact">
                    <a className="btn btn-primary">Get Started Free</a>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      this.openModal();
                    }}
                    className="video-btn"
                  >
                    <i className="flaticon-play-button"></i>
                    Watch Intro Video
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="ai-main-banner-image">
            <img
              src="/images/home-six/banner/main1.png"
              alt="image"
            />
            <div className="circle-shape"></div>
          </div>
          <div className="ai-main-banner-image right-image">
            <img
              src="/images/home-six/banner/main2.png"
              alt="image"
            />
            <div className="circle-shape"></div>
          </div>

          {/* Shape Images */}
          <div className="ai-main-banner-shape-1">
            <img src="/images/home-six/banner/shape-1.png" alt="image" />
          </div>
          <div className="ai-main-banner-shape-2">
            <img src="/images/home-six/banner/shape-2.png" alt="image" />
          </div>
          <div className="ai-main-banner-shape-3">
            <img src="/images/home-six/banner/shape-2.png" alt="image" />
          </div>
        </div>
      </>
    );
  }
}
