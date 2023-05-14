import { useEffect, useState, useRef } from "react";
import RemoteController from "../../components/Services/RemoteController";
import { SocketContext, socket, emitHandler, sendMessage } from '../../components/Socket/Socket';
import 'bootstrap/dist/css/bootstrap.css';
import RemoteVideoPanel from "../../components/Services/RemoteVideoPanel";

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })

export const NewView = () => {

    //최상위 컴포넌트인 현재 컴포넌트(NewView.js)에서 형제 컴포넌트 간(RemoteVideoPanel ~ RemoteController)의 stream 주고받기를 도와줌
    const [stream, setStream] = useState(undefined);
    const setRemoteStream = (stream) => {
        setStream(stream);
    }
    
    //SocketContext 하위의 컴포넌트들은 SocketContext 해당 소켓을 전역적으로 사용가능하도록 함.
    //예를 들어, RemoteVideoPanel과 RemoteController 컴포넌트는 SocketContext의 Child이므로 서로 같은 소켓을 사용 가능함.
    return (
        <>
            <SocketContext.Provider value={socket}>
                    {/* <RemoteVideoPanel stream={stream} setStream={setRemoteStream}/>
                    <RemoteController stream={stream} setStream={setRemoteStream}/> */}
                    <Scene />
            </SocketContext.Provider>
        </>
    );
}

export default NewView;