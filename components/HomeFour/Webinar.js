import React, { Component } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ModalVideo = dynamic(() => import('react-modal-video'), {
    ssr: false
});

class Webinar extends Component {

    state = {
        isOpen: false,
    }
    openModal = () => {
        this.setState({isOpen: true})
    }

    render() {
        return (
            <>
                <section className="webinar-area">
                    <div className="row m-0">
                        <div className="col-lg-6 p-0">
                            <div className="webinar-content">
                                <h2>Check Out Our Latest Web(문구1)</h2>
                                <p>문구 2</p>

                                <Link href="/index-4/#">
                                    <a className="btn btn-primary">Watch More</a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 p-0">
                            <div className="webinar-video-image">
                                <img src="/images/woman.jpg" alt="image" />

                                <div
                                    onClick={e => {e.preventDefault(); this.openModal()}}
                                    className="video-btn popup-youtube"
                                > 
                                    <i className="flaticon-play-button"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* If you want to change the video need to update below videoID */}
                    <ModalVideo 
                        channel='youtube' 
                        isOpen={this.state.isOpen} 
                        videoId='_ysd-zHamjk' 
                        onClose={() => this.setState({isOpen: false})} 
                    />
                </section>
            </>
        );
    }
}

export default Webinar;