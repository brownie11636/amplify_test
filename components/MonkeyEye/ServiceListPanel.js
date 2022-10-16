import React from 'react';
import ServiceProfileCard from './ServiceProfileCard';

export default function ServiceListPanel(props) {
    const onProfileSelect = (profile)=>{
        props.onProfileSelect(profile)
    }
    
    // console.log("profile list")
    // console.log(props.profileList)

    const profileList=props.profileList;
    const profileListComponents = [];
    for(const profile of profileList){
        profileListComponents.push(<ServiceProfileCard onSelect={onProfileSelect} profile={profile} />)
    }

    return (
        <section className="services-area bg-f2f6f9 ptb-110">
        <div className="container">
            <h3>Select Service Profile</h3>
            <div className="row">
                {profileListComponents}
            </div>
        </div>

        {/* Shape Images */}
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
        </div>
        </section>
    );
}
