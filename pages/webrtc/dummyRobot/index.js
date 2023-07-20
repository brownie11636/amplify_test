import { useEffect, useRef } from "react"
// import { PortalCommContext, commClient, commClientV01 } from '/utils/contexts/portalComm.js';
import MainLayout from "/components/Main/MainLayout.jsx"
import { PortalCommClient_v0_1 } from "/libs/portal/portalComm_v0.1.js";
import { socketPoint, socketPoint_dev, socketNsp } from "/toServer/API-AccessPoint";

// import dynamic from 'next/dynamic'
// const Scene = dynamic(() => import("../../components/Canvas/Scene"), { ssr: true })


export default function dummyRobot(){
  
  //SocketContext 하위의 컴포넌트들은 SocketContext 해당 소켓을 전역적으로 사용가능하도록 함.
  //예를 들어, RemoteVideoPanel과 RemoteController 컴포넌트는 SocketContext의 Child이므로 서로 같은 소켓을 사용 가능함.
  //https://cocoder16.tistory.com/62 사용예
  const commClientV01 = useRef(new PortalCommClient_v0_1);
  const robotSlt = useRef();
  const profileRef = useRef({
    id:"dev-id-0000",
    alias:"dummyProfileDev",
    type:"robot",
    auth_level:0,
    connectivity:{
      protocol:"SocketIO",
      version:"EIO=^4.0",
      status:"online",
      sid: undefined
    },
    description:"some discription",
    location:"chungpa-ro 345",
    created_at: "2023-07-09T01:14:27"
  })

  useEffect(()=>{
    console.log(profileRef.current)
    commClientV01.current.createSocketIO(socketPoint_dev,socketNsp,{transports:["websocket"]});
    commClientV01.current.initSocketIO();
    commClientV01.current.setMainSocket("/")
    
    let socket = commClientV01.current.socket;
    let registration_format = {request: "register", profile: profileRef.current}
    if(socket.id === undefined){
      socket.on("connect", () => {
        console.log("socket connected", socket.id)
        // socket.emit("update_module-portal", registration_format, (res)=>{
        //   console.log(res);
        // })
      })
    } else {
      console.log("socket connected", socket.id)

      // socket.emit("update_module-portal", registration_format, (res)=>{
      //   console.log(res);
      // })
    }
    console.log(commClientV01.current.socket.id)
    console.log(socketPoint_dev)
  },[])

  const updateRobotSelect = (modules) => {
    //module: List of moduleJSONs
    console.log("robotmodulesTYPE:",typeof modules)
    console.log("robotmodules:",modules)
    console.log('%c updateRobotSelect, received JSON \n', `color: ${"white"}; background: ${"black"}`, modules);
    robotSlt.current.options.length = 1;
    modules.map((JSON)=>{
      const option = document.createElement("option");
      option.innerText = `id: ${JSON.id}`;
      option.value = JSON.id;
      option.key = JSON.id;
      robotSlt.current.append(option);
      console.log(JSON)
    });
  }

  return (
    <MainLayout>
      <section className="bg-white w-[984px] h-[600px] mt-[38px] flex flex-col">
        <span>dummy robot</span>
        <button 
          className="absolute right-[20px] top-[10px] w-[130px] h-[40px] bg-[#182a5b]"
          onClick={() => {
            let registration_format = {request: "register", profile: profileRef.current}
            commClientV01.current.socket.emit("update-module-portal", registration_format, (res)=>{
            console.log(res);
            })
            console.log(registration_format)
          }}
        >
          <span className="text-white">create service</span>
        </button>
        <div>
          <select className="w-[250px]" >
            <option>available services</option>
          </select>
          <button 
            className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
            onClick={() => {
              // let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
              // commClient.requestJoinService(selected);
              // console.log("joinRequest",selected)
            }}
          >join service</button>
          <button 
            className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
            onClick={() => {
              // let selected = svcSlt.current.options[svcSlt.current.selectedIndex].value;
              // commClient.requestLeaveService(selected);
              // console.log("leaveRequest",selected)
          }}
          >leave service</button>
        </div>
        <div>
          <select className="w-[250px]" ref={robotSlt}>
            <option>available robots</option>
          </select>
          <button 
          className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
          onClick={() => {
            commClientV01.current.socket.emit("query-module-portal", "filter",(res) => {
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
            commClientV01.current.socket.emit("connect-module", msg, (res) => {
              console.log("response for connection request:", res);
              if(res.status === "ok") {
                console.log(commClientV01.current)
                commClientV01.current.connectedModules.push(selected);
              }
              console.log("module connected:", selected);
            });
            console.log("request robot connection",selected);
            }}
          >connect robot</button>
        </div>
      </section>
    </MainLayout>            
  );
}

// export default Teleoperation;