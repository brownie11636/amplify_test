import { SocketContext, socket } from '../../components/Socket/Socket';
import 'bootstrap/dist/css/bootstrap.css';

import dynamic from 'next/dynamic'
const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })

export const NewView = () => {
    
    //SocketContext 하위의 컴포넌트들은 SocketContext 해당 소켓을 전역적으로 사용가능하도록 함.
    //예를 들어, RemoteVideoPanel과 RemoteController 컴포넌트는 SocketContext의 Child이므로 서로 같은 소켓을 사용 가능함.
    return (
        <>
            <SocketContext.Provider value={socket}>
                    <Scene />
            </SocketContext.Provider>
        </>
    );
}

export default NewView;