import React from 'react';
import Link from 'next/link';

export default function ServiceProfile(props){

    const onClick = () => {
        props.onSelect(props.profile);
    }

    return(
        <div onClick={onClick} className="service-profile-card">
            <div className='frame'>
                {/* <div className="icon">
                    <i className="flaticon-automatic"></i>
                </div> */}
                <div className="info">
                    <h3>
                        <a>{props.profile.nickname}</a>
                    </h3>
                    <p>SID: {props.profile.sid}</p>
                </div>
            </div>
        </div>
    )
}
