import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
// const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    mouseDrag: true,
    items: 1,
    navText: [
        "<i class='flaticon-left-chevron'></i>",
        "<i class='flaticon-right-chevron'></i>"
    ]
};

const MainBoardWebRTC = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <>
            {display ? 
            // <OwlCarousel 
            //     className="home-slides owl-carousel owl-theme"
            //     {...options}
            // > 
                <div className="main-banner item-bg1">
                    <div className="container">
                        <div className="main-banner-content">
                            <h1>Tele-Operation</h1>
                            <p></p>

                            <div className="btn-box">
                                <Link href="#">
                                    <a className="btn btn-primary">WebRTC production</a>
                                </Link>
                                <Link href="#">
                                    <a className="optional-btn">About Us</a>
                                </Link>
                                <Link href="#">
                                    <a className="btn btn-primary">See Us</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            // </OwlCarousel>
             : ''}
        </>
    )
}

export default MainBoardWebRTC;