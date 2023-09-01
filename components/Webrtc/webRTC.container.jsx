import { Suspense, useContext, useEffect, useLayoutEffect, useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic'

import { socketNsp } from '../../toServer/API-AccessPoint';
import { PortalCommContext } from '../../utils/contexts/portalComm';
import PortalRTC from "../../libs/portal/webrtc/portalrtc";
import RTCvideo from "../../components/Services/VideoPanel";


const WebrtcContainer = () => {
  const commClient = useContext(PortalCommContext);
  const portalRTC = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();
  // const svcSltOpt = uesRef();
  const svcSlt = useRef();
  const joinedSvcSlt = useRef();
  // const [streamMode, setStreamMode] = useState({
    //   isStreamer: false,
    //   isViewer: false
    // })
    const streamMode = useRef({
      isStreamer: false,
      isViewer: false
    })

  const socketOn = useRef(false);
    
    useEffect(() =>{
      if(commClient.sockets[socketNsp].id === undefined)
      {
        commClient.sockets[socketNsp].on("connect", () => {
          console.log("Initiated Socket ID:",commClient.sockets[socketNsp].id);
          commClient.connectModule();
          // commClient.setOnServicesUpdate(updateServicesSelect, updateJoinedServicesSelect, socketNsp)
          // commClient.fetchServices().then((res) => {
          //   updateServicesSelect(res.services);
          // });
          portalRTC.current = new PortalRTC(commClient);
        });
      } 
      else
      {
        console.log("Socket ID :",commClient.sockets[socketNsp].id);
        commClient.connectModule();
        // commClient.setOnServicesUpdate(updateServicesSelect, updateJoinedServicesSelect, socketNsp)
        // commClient.fetchServices().then((res) => {
        //   updateServicesSelect(res.services);
        // });
        portalRTC.current = new PortalRTC(commClient);
      }
  
      return () => {
  
    }},[]);
    
  const startWebrtcStreaming = (streamMode) => {
    if (!portalRTC.current.localVideo){
      portalRTC.current.localVideo = localVideo.current;
    }
    console.log(portalRTC.remoteVideos)
    // console.log(portalRTC.remoteVideos.hasOwnProperty(toString(selected)))
    // if(portalRTC.current.remoteVideos) {
    //   console.log('return');
    //   return;
    // }
    portalRTC.current.remoteVideos[0] = remoteVideo.current;

    portalRTC.current.startStreaming(commClient.profile2).then(value => {
      console.log('isStart? >>>', value);
     });
  }
  
 

  return (
    <section className="bg-white w-[984px] h-[600px] mt-[38px] flex flex-col">
      <button 
      className="absolute right-[20px] top-[10px] w-[130px] h-[40px] bg-[#182a5b]"
      onClick={() => {commClient.createService()}}>
        <span className="text-white">create service</span>
      </button>
      <div>
        <select className="w-[250px]" ref={svcSlt}>
          <option>available services</option>
        </select>
        <button 
        className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
        onClick={() => {
          let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
          commClient.requestJoinService(selected);
          console.log("joinRequest",selected)
        }}
        >join service</button>
        <button 
        className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
        onClick={() => {
          let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
          commClient.requestLeaveService(selected);
          console.log("leaveRequest",selected)
        }}
        >leave service</button>
      </div>
      <div>
        <select className="w-[250px]" ref={joinedSvcSlt}>
          <option>available joined services</option>
        </select>
        <button 
        className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
        onClick={() => {
          startWebrtcStreaming(streamMode);
          // startWebrtcStreaming(streamMode, taskID);

        }}
        >start streaming</button>        
        <button 
        className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
        onClick={() => {
          let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
          commClient.requestLeaveService(selected);
          console.log("leaveRequest",selected);
          }}
        >stop streaming</button>
      </div>
      <div className="flex" >
        {/* <RTCvideo
        setStream={}
        /> */}
        <video className="w-[300px]" autoPlay playsInline ref={localVideo}/>
          {/* <source src="../../drei.mp4" type="video/mp4"></source> */}
        <video className="w-[300px]" autoPlay playsInline ref={remoteVideo}/>
      </div>

    </section>
  );
};



export default WebrtcContainer;