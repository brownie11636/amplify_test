import React, { Component } from 'react';
import Link from "next/link";

class WebRTCDetailsContent extends Component {
    render() {
        return (
            <div className="services-details-area ptb-110">
                <div className="container">
                    <div className="services-details-overview">
                        <div className="services-details-desc mb-30">
                            <h3>Streamer</h3>
                            <p>WebRTC를 통해 스트리머가 되어보세요!</p>

                            <div className="btn-box">
                                    <Link href="/webrtc/cast" className="btn btn-primary">
                                    Become a Streamer
                                    </Link>
                            </div>
                        </div>

                        <div className="services-details-image">
                            <img src="/images/services-details/service-details1.jpg" alt="image" />
                        </div>
                    </div>

                    <div className="services-details-overview">
                        <div className="services-details-desc">
                            <h3>Viewer</h3>
                            <p>다른 스트리머를 시청해보세요!</p>
                            <div className="btn-box">
                                    <Link href="/webrtc/view" className="btn btn-primary">
                                    Become a Viewer
                                    </Link>
                            </div>

                        </div>
                        <div className="services-details-image mb-30">
                            <img src="/images/services-details/service-details2.jpg" alt="image" />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default WebRTCDetailsContent;