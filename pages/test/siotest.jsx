import { PortalCommContext, commClient, commClientV01 } from '../../utils/contexts/portalComm';
import SioInterface from  "../../components/Test/SioInterface"
import MainLayout from "../../components/Main/MainLayout"

// import dynamic from 'next/dynamic'
// const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })


export default function portalRTC(){
    
    //SocketContext 하위의 컴포넌트들은 SocketContext 해당 소켓을 전역적으로 사용가능하도록 함.
    //예를 들어, RemoteVideoPanel과 RemoteController 컴포넌트는 SocketContext의 Child이므로 서로 같은 소켓을 사용 가능함.
    //https://cocoder16.tistory.com/62 사용예
    return (
        <div>
            <PortalCommContext.Provider value={{commClientV01,commClient}}>
                <MainLayout>
                    <span>Hello</span>
                    <SioInterface>

                    </SioInterface>
                </MainLayout>            
            </PortalCommContext.Provider>
        </div>
    );
}