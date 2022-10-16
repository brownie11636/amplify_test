import React from 'react';
import ServiceProfile from './ServiceProfile';

export function ServiceListPanel(props) {
    const onSelect = (list)=>{
        props.onSelect(list)
    }

    
    console.log("profile list")
    console.log(props.profileList)

    const profileList=props.profileList;
    const profileListComponents = [];
    for(const profile of profileList){
        profileListComponents.push(<ServiceProfile name={profile.nickname} sid={profile.sid} />)
    }

    return (
        <section className="services-area bg-f2f6f9 ptb-110">
        <div className="container">
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
export default ServiceListPanel;