import { Suspense, createContext, useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic'
import Image from "next/image"

import { socketNsp } from '../../toServer/API-AccessPoint';
import { PortalCommContext } from '../../utils/contexts/portalComm';
import PortalRTC from "../../libs/portal/webrtc/portalrtc";
import sampleImg from "./sample_jpeg.jpeg"

import { useControlStore } from "../../store/zustand/control.js"

const Scene = dynamic(() => import("../../components/PortalXR/Scene"), { ssr: true })
// import Scene from "../../components/PortalXR/Scene";

export const RgbdContext = createContext();
export const PortalRTCContext = createContext();
export const visibleRangeContext = createContext();

const XRContainer = () => {
  const { commClient, commClientV01 } = useContext(PortalCommContext);
  const [zedDistance, setZedDistance] = useState(3);
  const portalRTCRef = useRef();
  const localVideo = useRef();
  const remoteVideo = useRef();
  // const svcSltOpt = uesRef();
  const svcSlt = useRef();
  const joinedSvcSlt = useRef();
  const robotSlt = useRef();
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
  const visibleRangeRef = useRef({min : 0.2, max : 3, bitDepth : 8.0});

  //onMount
  useEffect(() => {
    if (commClient.sockets[socketNsp].id === undefined) {
      console.log("socket.id:" + commClient.sockets[socketNsp])
      commClient.sockets[socketNsp].on("connect", () => {
        console.log("initiated socket.id:", commClient.sockets[socketNsp].id);
        commClient.setOnServicesUpdate(updateServicesSelect, updateJoinedServicesSelect, socketNsp)
        commClient.fetchServices().then((res) => {
          updateServicesSelect(res.services);
        });
        portalRTCRef.current = new PortalRTC(commClient);
        portalRTCRef.current.rgbImg = rgbSrcRef.current;
        portalRTCRef.current.depthImg = depthSrcRef.current;
      })
    } else {
      console.log("socket.id:", commClient.sockets[socketNsp].id);
      commClient.setOnServicesUpdate(updateServicesSelect, updateJoinedServicesSelect, socketNsp)
      commClient.fetchServices().then((res) => {
        updateServicesSelect(res.services);
      });
      portalRTCRef.current = new PortalRTC(commClient);
      portalRTCRef.current.rgbImg = rgbSrcRef.current;
      portalRTCRef.current.depthImg = depthSrcRef.current;

    }
    // depthSrcRef.current.src = sampleImg;
    // rgbSrcRef.current.src = sampleImg;
    return () => {
    }
  }, []);

  const onLoadRgbImg = useCallback(() => {
    //console.log('image lo!!!!!!!!!!!')
    portalRTCRef.current.rgbImg = rgbSrcRef.current;

  }, [])
  const onLoadDepthImg = useCallback(() => {
    portalRTCRef.current.depthImg = depthSrcRef.current;

  }, [])

  const setMaxDistance = (value) => {

    if (visibleRangeRef.current.min >= value) {
      return;
    }
    console.log(visibleRangeRef.current.max);
    useControlStore.setState({visibleRange: {...visibleRangeRef.current}})

    visibleRangeRef.current.max = value;
    let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
    let zedSetting = { targetSetting : 'distance-max', value : visibleRangeRef.current.max };
    commClient.socket.emit("zed:command", selected, zedSetting);
  }

  const setMinDistance = (value) => {
    //setZedDistance(value);
    //useControlStore.setState({ depthMax: value})
    if (visibleRangeRef.current.max <= value) {
      return;
    }
    console.log(visibleRangeRef.current.min);

    visibleRangeRef.current.min = value;
    let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
    let zedSetting = { targetSetting : 'distance-min', value : visibleRangeRef.current.min };
    commClient.socket.emit("zed:command", selected, zedSetting);
  }



  const updateServicesSelect = (servicesJSON) => {
    console.log('%c updateServicesSelect, received JSON \n', `color: ${"white"}; background: ${"black"}`, servicesJSON);

    svcSlt.current.options.length = 1;
    for (const [key, value] of Object.entries(Object(servicesJSON))) {
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
    for (const [key, value] of Object.entries(Object(joinedServicesJSON))) {
      const option = document.createElement("option");
      option.innerText = `${value.service_id} : isHost - ${value.is_host}`;
      option.value = `${value.service_id}`;
      option.key = value.service_id;
      joinedSvcSlt.current.append(option);
    }
  }

  const updateRobotSelect = (modules) => {
    //module: List of moduleJSONs
    console.log("robotmodulesTYPE:", typeof modules)
    console.log("robotmodules:", modules)
    console.log('%c updateRobotSelect, received JSON \n', `color: ${"white"}; background: ${"black"}`, modules);
    robotSlt.current.options.length = 1;
    modules.map((JSON) => {
      const option = document.createElement("option");
      option.innerText = `id: ${JSON.id}`;
      option.value = JSON.id;
      option.key = JSON.id;
      robotSlt.current.append(option);
      console.log(JSON)
    });
  }

  const startWebrtcStreaming = (streamMode, selected) => {
    if (!portalRTCRef.current.localVideo) {
      portalRTCRef.current.localVideo = localVideo.current;
    }
    console.log(portalRTCRef.remoteVideos)
    // console.log(portalRTCRef.remoteVideos.hasOwnProperty(toString(selected)))
    if (portalRTCRef.current.remoteVideos[selected]) {
      console.log('return');
      return;
    }
    portalRTCRef.current.remoteVideos[selected] = remoteVideo.current;

    portalRTCRef.current.startStreaming(selected, streamMode).then(value => {
      console.log('isStart? >>>', value);
    });
  }



  return (
    <>
      <section className="bg-white w-[984px] h-[600px] mt-[38px] flex flex-col">
        <button
          className="absolute right-[20px] top-[10px] w-[130px] h-[40px] bg-[#182a5b]"
          onClick={() => { commClient.createService() }}>
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
              console.log("joinRequest", selected)
            }}
          >join service</button>
          <button
            className="text-white w-[130px] h-[40px] bg-[#182a5b]"
            onClick={() => {
              let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
              commClient.requestLeaveService(selected);
              console.log("leaveRequest", selected)
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
              console.log("leaveRequest", selected);
            }}
          >stop streaming</button>
        </div>
        <div>
          <select className="w-[250px]" ref={robotSlt}>
            <option>available robots</option>
          </select>
          <button
            className="text-white w-[130px] h-[40px] bg-[#182a5b]"
            onClick={() => {
              commClientV01.socket.emit("query-module-portal", "filter", (res) => {
                updateRobotSelect(res)
              })
            }}
          >query robots</button>
          <button
            className="text-white w-[130px] h-[40px] bg-[#182a5b]"
            onClick={() => {
              let selected = robotSlt.current.options[robotSlt.current.selectedIndex].value;
              let msg = { moduleId: selected }
              console.log(robotSlt.current.options[robotSlt.current.selectedIndex])
              commClientV01.socket.emit("connect-module", msg, (res) => {
                console.log("response for connection request:", res);
                if (res.status === "ok") {
                  console.log(commClientV01)
                  commClientV01.connectedModules.push(selected);
                }
                console.log("module connected:", selected);
              });
              console.log("request robot connection", selected);
            }}
          >connect robot</button>
        </div>
        <div>
          {/* min
          <input
            type="range"
            min={0.2}
            max={6}
            color="blue"
            step={0.01}
            onChange={(event) => {
              setMinDistance(event.target.valueAsNumber);
            }}
            //value={visibleRangeRef.current.min}
          /> */}
          max
          <input
            type="range"
            min={1}
            max={7}
            color="gray"
            step={0.3}
            onChange={(event) => {
              setMaxDistance(event.target.valueAsNumber);
            }}
          />
          {/* {zedDistance} */}
          <button
            className="text-white w-[130px] h-[40px] bg-[#182a5b]"
            onClick={() => {
              // 사실 이 부분은 셀렉트 리스트에서 '선택'만 해도 바뀌는 부분이라 실제로는 이렇게 하면 안되긴 함.
              // 테스트용이니 대충 만듦.
              let selected = joinedSvcSlt.current.options[joinedSvcSlt.current.selectedIndex].value;
              let zedSetting = { targetSetting: 'bit', value: 8 };
              commClient.socket.emit("zed:command", selected, zedSetting);
              visibleRangeRef.current.bitDepth = 8.0;
              console.log(visibleRangeRef.current.bitDepth)
            }}
          >8-bit</button>
                    <button
            className="text-white w-[130px] h-[40px] bg-[#182a5b]"
            onClick={() => {
              // 사실 이 부분은 셀렉트 리스트에서 '선택'만 해도 바뀌는 부분이라 실제로는 이렇게 하면 안되긴 함.
              // 테스트용이니 대충 만듦.
              let selected = joinedSvcSlt.current.options[joinedSvcSlt.current.selectedIndex].value;
              let zedSetting = { targetSetting: 'bit', value: 12 };
              commClient.socket.emit("zed:command", selected, zedSetting);
              visibleRangeRef.current.bitDepth = 12.0;
              console.log(visibleRangeRef.current.bitDepth)
            }}
          >12-bit</button>

        </div>
        <div>
          <RgbdContext.Provider value={{ rgbSrcRef, depthSrcRef, visibleRangeRef }}>
            <PortalRTCContext.Provider value={portalRTCRef}>
              <Scene />
            </PortalRTCContext.Provider>
          </RgbdContext.Provider>
        </div>
        <div>
          {/* <Image ref={depthSrcRef} src={sampleImg} width={1280} height={720} onLoad={onLoadDepthImg} loading='lazy'/>
            <Image ref={rgbSrcRef} src={sampleImg} width={1280} height={720} onLoad={onLoadRgbImg} loading='lazy'/> */}
          {/* <img ref={depthSrcRef} src="/sample_jpeg2.jpeg" width="1280" height="720" style={{width:"1280px", height:"720px"}} onLoad={onLoadDepthImg} loading='auto'/>
            <img ref={rgbSrcRef} src="/sample_jpeg2.jpeg" width="1280" height="720" style={{width:"1280px", height:"720px"}}  onLoad={onLoadRgbImg} loading='auto'/> */}
          {/* <Image ref={depthSrcRef} src={sampleImg} width={1280} height={720} onload={onLoadDepthImg} />
            <Image ref={rgbSrcRef} src={sampleImg} width={1280} height={720} onload={onLoadRgbImg} /> */}
          {/* <Image ref={depthSrcRef} src={sampleImg} width={1280} height={720} priority={true} />
            <Image ref={rgbSrcRef} src={sampleImg} width={1280} height={720} priority={true} /> */}
        </div>

      </section>
      <div style={{ position: "absolute", top: "500px", left: "-2000px", width: "3000", height: "3000", zIndex: "111" }}>
        <img ref={depthSrcRef} src="/depth-sample-img.png" width="1280" height="720" style={{ width: "1280px", height: "720px" }} onLoad={onLoadDepthImg} loading='auto' />
        <img ref={rgbSrcRef} src="/rgb-sample-img.jpeg" width="1280" height="720" style={{ width: "1280px", height: "720px" }} onLoad={onLoadRgbImg} loading='auto' />
      </div>

    </>
  );
};



export default XRContainer;