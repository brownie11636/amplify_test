import React, { useState, useEffect } from "react";
import { PortalCommContext, commClient } from '../../utils/contexts/portalComm.js';
import WebrtcContainer from  "../../components/Webrtc/webRTC.container.jsx"
import RTCvideo from "../../components/Services/VideoPanel.js";
import MainLayout from "../../components/Main/MainLayout.jsx"

// import dynamic from 'next/dynamic'
// const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })


//webRTC
//videoCall
export default function webRtc2d({sessions}){


    useEffect(() => {
        // sessionStorage.setItem("taskAppConfig", "selectedItem");
        const taskAppConfig = JSON.parse(sessionStorage.getItem("taskAppConfig"));
        // const taskAppConfig = sessionStorage.getItem("taskAppConfig");
        // sessionStorage.removeItem("taskAppConfig");
        console.log("taskAppConfig: ", taskAppConfig);
            if (sessions?.token?.user?.affiliation === "admin") {
        // console.log("admin mode");
        } else {
        // console.log("node-admin mode:", sessions?.token?.user?.affiliation);
        }
      }, [sessions]);

    //SocketContext 하위의 컴포넌트들은 SocketContext 해당 소켓을 전역적으로 사용가능하도록 함.
    //예를 들어, RemoteVideoPanel과 RemoteController 컴포넌트는 SocketContext의 Child이므로 서로 같은 소켓을 사용 가능함.
    //https://cocoder16.tistory.com/62 사용예
    return (
            <PortalCommContext.Provider value={commClient}>
                <MainLayout>
                    <span>Hello</span>
                    <WebrtcContainer>
                    
                    </WebrtcContainer>
                </MainLayout>            
            </PortalCommContext.Provider>
    );
}

// export default Teleoperation;