
import { useState, useRef } from "react";
import { SocketContext, socket } from '../../components/Socket/Socket';

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })

export const PortalArm = () => {

    const point = useRef()

    const updatePCD = (data) => {
        point.current = data;
    }

    return (<>
        <div>
            <SocketContext.Provider value={socket}>
                {/* <Scene PCD={point}/> */}
            </SocketContext.Provider>
        </div>
    </>);

}

export default PortalArm;
