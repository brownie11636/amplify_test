
import React, { useState, useEffect, useRef } from 'react';

export const RemoteVideoPanel = (props) => {

    const remoteVideoRef = useRef();

    useEffect( () => {
        props.setStream(remoteVideoRef.current);
    }, []);

    return (
        <>
            <video
                id="remotevideo"
                style={{
                    width: 240,
                    height: 240,
                    margin: 5,
                    backgroundColor: "black",
                }}
                ref={remoteVideoRef}
                autoPlay
            />
        </>
    )

}

export default RemoteVideoPanel;