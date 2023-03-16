import React, { useState } from 'react';
import Link from 'next/link';

export default function ServiceProfile(props){

    //const [profile, setProfile] = useState(undefined);

    const onClickCard = (profile) => {
        props.onSelect(props.profile);
    }

    return(
        <div className="col-lg-6 col-sm-12">
            <div onClick={onClick} className="service-profile-card">
                <div className='frame'>
                    {/* <div className="icon">
                        <i className="flaticon-automatic"></i>
                    </div> */}
                    <div className="info" onClick={onClickCard}>
                        <h3>
                            <a>{props.profile.nickname}</a>
                        </h3>
                        <p>SID: {props.profile.sid}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
