import React from 'react';
import Link from 'next/link';

export default function ServiceProfile(props){
    return(
        <div className="col-lg-4 col-sm-6">
            <div className="single-services-box">
                <div className='panel'>
                    <div className="icon">
                        <i className="flaticon-automatic"></i>
                    </div>
                </div>
                <h3>
                    <Link href="/webrtc">
                        <a>{props.name}</a>
                    </Link>
                </h3>
                <p>SID: {props.sid}</p>
            </div>
        </div>
    )
}
