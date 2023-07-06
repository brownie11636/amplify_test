import { Suspense, createContext,useContext, useEffect, useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic'
import Image from "next/Image"

import { socketNsp } from '../../toServer/API-AccessPoint';
import { PortalCommContext } from '../../utils/contexts/portalComm';
import PortalRTC from "../../libs/portal/webrtc/portalrtc";
import sampleImg from "./sample_jpeg.jpeg"

const Scene = dynamic(() => import("../../components/PortalXR/Scene"), { ssr: true })

export const RgbdContext = createContext();
export const PortalRTCContext = createContext();

const XRContainer = () => {
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

  const depthSrcRef = useRef();
  const rgbSrcRef = useRef();
    
  //onMount
  useEffect(() => {
    console.log("socket.id:",commClient.sockets[socketNsp].id);
    commClient.setOnServicesUpdate(updateServicesSelect, updateJoinedServicesSelect, socketNsp)
    commClient.fetchServices().then((res) => {
      updateServicesSelect(res.services);
    });
    portalRTC.current = new PortalRTC(commClient);

    return () => {
    }
  },[]);

  const updateServicesSelect = (servicesJSON) => {
    console.log('%c updateServicesSelect, received JSON \n', `color: ${"white"}; background: ${"black"}`, servicesJSON);
    
    svcSlt.current.options.length = 1;
    for ( const [key, value] of Object.entries(Object(servicesJSON))){
      const option = document.createElement("option");
      option.innerText = `${value.service_id}`;
      option.value = `${value.service_id}`;
      option.key = value.service_id;
      
      svcSlt.current.append(option);
    }
  }
  
  const updateJoinedServicesSelect = (joinedServicesJSON) => {
    console.log('%c updateJoinedServicesSelect, received JSON \n', `color: ${"white"}; background: ${"black"}`, joinedServicesJSON);
    
    joinedSvcSlt.current.options.length = 1;
    for ( const [key, value] of Object.entries(Object(joinedServicesJSON))){
      const option = document.createElement("option");
      option.innerText = `${value.service_id} : isHost - ${value.is_host}`;
      option.value = `${value.service_id}`;
      option.key = value.service_id;
      joinedSvcSlt.current.append(option);
    }
  }

  const startWebrtcStreaming = (streamMode, selected) => {
    if (!portalRTC.current.localVideo){
      portalRTC.current.localVideo = localVideo.current;
    }
    console.log(portalRTC.remoteVideos)
    // console.log(portalRTC.remoteVideos.hasOwnProperty(toString(selected)))
    if(portalRTC.current.remoteVideos[selected]) {
      console.log('return');
      return;
    }
    portalRTC.current.remoteVideos[selected] = remoteVideo.current;

    portalRTC.current.startStreaming(selected, streamMode).then(value => {
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
          let selected = joinedSvcSlt.current.options[joinedSvcSlt.current.selectedIndex].value;
          if (selected === 'field') {
            if (!streamMode.isViewer) alert('plz select the joined service list');
            return;      
          }
          startWebrtcStreaming(streamMode, selected);
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

    </div>
      <div>
        <RgbdContext.Provider value={{rgbSrcRef, depthSrcRef}}>
          <PortalRTCContext.Provider value={portalRTC}>
            <Scene />
          </PortalRTCContext.Provider>
        </RgbdContext.Provider>
      </div>
      <div>
        {/* <Suspense> */}
          <Image ref={depthSrcRef} src={sampleImg} width={1280} height={720} />
          <Image ref={rgbSrcRef} src={sampleImg} width={1280} height={720} />
          {/* <Image ref={depthSrcRef} src={sampleImg} width={1280} height={720} priority={true} />
          <Image ref={rgbSrcRef} src={sampleImg} width={1280} height={720} priority={true} /> */}
        {/* </Suspense> */}
      </div>

    </section>
  );
};



export default XRContainer;