
import { useState, useRef } from "react";
import DatachannelController from "../../components/Services/DatachannelController"
import { SocketContext, socket } from '../../components/Socket/Socket';

import dynamic from 'next/dynamic'

// const PCDload = dynamic(() => import("../../components/Canvas/PCDload"), { ssr: true })

export const PortalArm2 = () => {

    const point = useRef()

    const updatePCD = (data) => {
        point.current = data;
    }

    return (<>
        <div>
            <SocketContext.Provider value={socket}>
                {/* <PCDload PCD={point}/> */}
            </SocketContext.Provider>
        </div>
    </>);

}

export default PortalArm2;
