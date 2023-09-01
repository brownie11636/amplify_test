import React, { useState, useEffect } from "react";
import { PortalCommContext, commClient, commClientV01 } from '../../utils/contexts/portalComm';
import SioRobot from  "../../components/Socket/SioRobot"
import MainLayout from "../../components/Main/MainLayout"
import { set } from "lodash";
import PltModuleRoster from '../main/PltModuleRoster';
import { getSession, useSession } from "next-auth/react";
// import dynamic from 'next/dynamic'
// const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })


export default function portalRTC(props){


    const [targetRobot, setTargetRobot] = useState({});
    const [targetCamera, setTargetCamera] = useState({});
    const onSelectCameraModule = (selectedItem) => {
        taskProfile.app.config.camera = selectedItem;
        setTaskProfile(taskProfile);
        console.log(taskProfile);
      }
      const onSelectRobotModule = (selectedItem) => {
        taskProfile.app.config.robot = selectedItem;
        setTaskProfile(taskProfile);
        console.log(taskProfile);
      }
    useEffect(() => {
        // sessionStorage.setItem("taskAppConfig", "selectedItem");
        const taskInfo = JSON.parse(sessionStorage.getItem("taskAppConfig"));
        // const taskAppConfig = sessionStorage.getItem("taskAppConfig");
        // sessionStorage.removeItem("taskAppConfig");


        setTargetRobot(JSON.parse(taskInfo.app).config.camera);
        setTargetRobot(JSON.parse(taskInfo.app).config.robot);

        console.log("taskAppConfig: ", taskInfo);
        if (props?.sessions?.token?.user?.affiliation === "admin") {
        // console.log("admin mode");
        } else {
        // console.log("node-admin mode:", sessions?.token?.user?.affiliation);
        }
      }, [props?.sessions]);
    //SocketContext 하위의 컴포넌트들은 SocketContext 해당 소켓을 전역적으로 사용가능하도록 함.
    //예를 들어, RemoteVideoPanel과 RemoteController 컴포넌트는 SocketContext의 Child이므로 서로 같은 소켓을 사용 가능함.
    //https://cocoder16.tistory.com/62 사용예
    return (
        <div>
            <PortalCommContext.Provider value={{commClientV01,commClient}}>
                <MainLayout>
                    <span>Hello</span>
                    <SioRobot target={targetRobot}/>
                    <div>
                        <PltModuleRoster filter={{type:"robot"}} onSelect={onSelectRobotModule} sessions={props.sessions}/>
                        <PltModuleRoster filter={{type:"camera"}} onSelect={onSelectCameraModule} sessions={props.sessions}/>
                    </div>
                </MainLayout>            
            </PortalCommContext.Provider>
        </div>
    );
}

export const getInitialProps = async (context) => {
    const session = await getSession(context);
    // console.log(session);
    if (!session) {
      return {
        redirect: {
          destination: "/main/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: { sessions: session },
      };
    }
  };
  