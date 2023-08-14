import _ from "lodash"
import * as THREE from 'three'
import { forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Box } from "@react-three/drei"
import { useXR, useController } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

import { PortalCommContext } from '../../../utils/contexts/portalComm';
import { useXRGamepadStore } from "../../../store/zustand/XRGamepad.js"
import { useModeStore } from "../../../store/zustand/mode.js"
import { useControlStore } from "../../../store/zustand/control.js"

import Model from "../components/Model"
import Table from "./Table"
import Arm from "./Arm"
import Gripper from "./Gripper"
import ControlGuide from "./ControlGuide"

// import Box from './boxes'
const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;

const armPos =  [0, 0.717, 0]
const armPosVec = new THREE.Vector3().fromArray(armPos);
const armGeometries = [
  [0, 0.0991, 0],
  [0, 0.0634, -0.0744],
  [0.425, 0, 0],
  [0.39225, 0, 0.0215],
  [0, -0.0463, -0.0804],
  [0, -0.0534, -0.0463],
];

const gripperGeometries = [
  [0, 0, -0.0533],
  [0.01861, 0, -0.04739],
  [0.008, 0, -0.058],
  [0, 0, -0.05694],
  [0, 0, 0],
];

let acculTime = 0;
let dir = 1

let packet = { } 

export default function PortalArm(type, path, ...props) {

  const vrLog = useControlStore.getState().updateNewLog;

  const {commClientV01} = useContext(PortalCommContext);
  const ref = useRef();
  const squeezePressed_R = useRef({now:false, prev:false})
  const controllerMode = useRef(useModeStore.getState().controllerMode);
  const stickUp_R = useRef(useXRGamepadStore.getState().stickUp_R)
  const stickDown_R = useRef(useXRGamepadStore.getState().stickDown_R)
  const stickLeft_R = useRef(useXRGamepadStore.getState().stickLeft_R)
  const stickRight_R = useRef(useXRGamepadStore.getState().stickRight_R)

  const gripDistanceRef = useRef(useControlStore.getState().gripDistance)
  const increaseGripDistance = useControlStore((state)=>state.increaseGripDistance);

  const rightController = useController('right');
  const leftController = useController('left');
  const [isSafe, setIsSafe] = useState(false);
  const boundary = [[-0.5,0.5],[0.6,0.2],[-0.6,0.1]]

  const armAngles = [60,-90,90,0,30,0]
  const [loader, setLoader] = useState(new GLTFLoader())
  const armRef = useRef([{},{},{},{},{},{},{}]);
  const gripperRef = useRef([{},{},{},{},{},{},{},{},{},{}]);
  const controlGuideRef = useRef();
  // const [conPos, setConPos]= useState(new THREE.Vector3);
  // const [conRot, setConRot]= useState(new THREE.Vector3);
  

  useEffect(() => {

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/3d_models/libs/draco/")
    setLoader((gltfLoader) => gltfLoader.setDRACOLoader(dracoLoader));
    
    console.log("socketid in PortalArm.jsx")
    console.log(commClientV01.socket.id)

    // useControlStore.setState({actualAngles_q:[60*DEG2RAD,-90*DEG2RAD,90*DEG2RAD,0,30*DEG2RAD,0]})
    // useControlStore.setState({actualAngles_q:[77.1*DEG2RAD,-106.47*DEG2RAD,128.79*DEG2RAD,-22.15*DEG2RAD,77*DEG2RAD,30.2*DEG2RAD]})

    commClientV01.socket.on("robot",(type, packet)=>{
      console.log(type)
      console.log(packet)
      vrLog(type)
      vrLog(packet)

      if(type === "C2C" && packet.msg.type === "_q"){
        useControlStore.setState({actualAngles_q:packet.msg.payload})
        console.log(useControlStore.getState().actualAngles_q)
      }
    })

    if(commClientV01.connectedModules){
      //request _q msg (robot joint angles) for initial angle
      packet = { 
        from: commClientV01.socket.id, 
        to:commClientV01.connectedModules[0],
        msg: {
          type:"get_pos"
        } 
      }
      commClientV01.socket.emit("robot","C2C",packet)
    }
    //commClient.socket callback -> 명령 들어왓을때 setArmAngles하기
    //commClient.socket callback -> 명령 들어왓을때 setGripperAngles하기
    // ref.current.position.x = 0.3;

    // console.log("gripperpqerweqr")
    // console.log(gripperRef.current[1].position)
    // console.log(gripperRef.current[0].localToWorld(
    //   gripperRef.current[1].position
    // ))

    // console.log(ref.current.worldToLocal(gripperRef.current[0].localToWorld(
    //   gripperRef.current[1].position
    // )))

    const unsubXRGamepadStore = useXRGamepadStore.subscribe((state) => {
      squeezePressed_R.current.prev = squeezePressed_R.current.now;
      squeezePressed_R.current.now = state.squeezePressed_R
      stickUp_R.current = state.stickUp_R;
      stickDown_R.current = state.stickDown_R;
      stickLeft_R.current = state.stickLeft_R;
      stickRight_R.current = state.stickRight_R;
    })
    const unsubModeStore = useModeStore.subscribe((state) => {
      controllerMode.current = state.controllerMode
    })
    
    
    return () => {
      commClientV01.socket.off("robot")
      console.log("robot comm off")
      unsubXRGamepadStore();
      unsubModeStore();
    }
  }, []);

  //socket io callback을 붙히기
  let pos = [0,0,0];
  let vec3 = new THREE.Vector3();
  let rot = [0,0,0];
  let ang = 60;
  let angles;
  let euler = new THREE.Euler();
  let posTest = new THREE.Vector3(1,1,1);
  let storeDistance
  let dir = 1
  let i = 0;
  let iXR = 0;

  useFrame((state, delta, XRFrame)=> { 

    if(i<2){
      // Initial setting of ControlGuide. 
      // Excute it in second frame to refer Gripper's position and rotation.
      i++
      controlGuideRef.current.position.copy(
        ref.current.worldToLocal(
          gripperRef.current[0].localToWorld(
            gripperRef.current[0].position.clone()
          ).clone())
      );
      gripperRef.current[9].getWorldQuaternion(
        controlGuideRef.current.rotation)
        console.log(controlGuideRef.current.rotation)
    }

    if(i<3 && XRFrame){
      if(commClientV01.connectedModules){
        //request _q msg (robot joint angles) for initial angle
        packet = { 
          from: commClientV01.socket.id, 
          to:commClientV01.connectedModules[0],
          msg: {
            type:"get_pos"
          } 
        }
        commClientV01.socket.emit("robot","C2C",packet)
      }
    }

    // ang += delta;
    // useControlStore.setState({actualAngles_q:[ang*DEG2RAD,-90*DEG2RAD,90*DEG2RAD,0,30*DEG2RAD,0]})
    // useControlStore.setState({actualAngles_q:[60*DEG2RAD,-90*DEG2RAD,90*DEG2RAD,0,30*DEG2RAD,0]})
    // updateActualAngles_q([ang,-90,90,0,30,0])
    // console.log(storeDistance)
    // if (gripDistanceRef.current >= 100) dir = -1
    // if (gripDistanceRef.current <= 5) dir = 1 
    // increaseGripDistance(dir*delta*10)

    // controlGuideRef.current.position.copy(posTest)
    if(XRFrame){
      // console.log(delta)
      acculTime += delta
      // console.log(delta)
      if (acculTime > 0.05){
        // console.log(acculTime)
        acculTime = 0
        if (controllerMode.current === "operating" && rightController){
          // controlGuideRef.current.position.copy(
          //   armRef.current[0].worldToLocal(           //convert to local  
          //     rightController.controller.position));  //world position
          // controlGuideRef.current.rotation.copy(rightController.controller.rotation);

          if (squeezePressed_R.current.now === true){  //squeeze
            
            //controller 6DOF
            
            // 컨트롤러 위치를 가져옴
            // pos = armRef.current.children[0].worldToLocal(
            //   rightController.controller.position).toArray();
            
            // controlGuideRef 포지션을 가져옴
            pos = armRef.current[1].worldToLocal(     // base model coordinate
              controlGuideRef.current.getWorldPosition(vec3)).toArray();

            pos = [-pos[0], pos[2], pos[1]];
            pos = pos.map((val) => Math.round(val*10000)/10000)
            
            // vrLog("x: "+pos[0]+", y: "+pos[1]+",z: "+pos[2]);
              
            euler.copy(controlGuideRef.current.rotation.clone());
            // euler.copy(controlGuideRef.current.rotation).reorder("ZYX");
            // euler.x -= 0.5 * Math.PI;
            // euler.reorder("XZY");
            // rot = euler.toArray()
            rot = euler.reorder("XZY").toArray()
            vrLog(rot[3]);
            rot = rot.map((val)=>Math.round(val*10000)/10000)
            // rot = euler.toArray().map((val)=>Math.round(val*10000)/10000)
            rot = [-rot[0], rot[2], rot[1]]
            // rot = [-rot[0], -rot[1], rot[2]]
            // console.log(typeof rot[0], typeof rot[1], typeof rot[2])
            vrLog("rot x: "+rot[0]+", y: "+rot[1]+",z: "+rot[2]);

            if (stickRight_R.current) {
            // if (stickUp_R.current) {
              increaseGripDistance(-30 * delta)
            } else if (stickLeft_R.current) {
            // } else if (stickDown_R.current) {
              vrLog("close")
              increaseGripDistance(30 * delta)
            }

            packet = { 
              from: commClientV01.socket.id, 
              to:commClientV01.connectedModules[0],
              msg:{
                type:"set_pos", 
                data:{
                  arm:[...pos,...rot],
                  grip: Math.floor(gripDistanceRef.current * 10) 
                }
              }
            } 
            console.log("send C2C packet")
            // console.log(packet.msg.data.arm);
            commClientV01.socket.emit("robot", "C2C", packet, (res) => {
            // console.log("msg-v0 response:",res)
            })
          }
        }

        // if (stickUp_R === true || stickDown_R === true ) {
        //   if(stickUp_R === true) dir = 1;
        //   else if (stickDown_R) dir = -1;

        //   increaseGripDistance(dir * 30 * delta)
        // }     
      }
    }

  })

  useEffect(()=>{
    console.log("portal arm rendered")
  },)

  return(
    <group ref={ref}>

      <Table loader={loader}>
        <Arm ref={armRef} loader={loader} depth={6} angles={armAngles} positions={[armPos,...armGeometries]}>
          <Gripper ref={gripperRef} loader={loader} geoConfig={gripperGeometries} />
        </Arm>
      </Table> 
      {/* <Table loader={loader} position={[1,0,0]}/>
      <Table loader={loader} position={[2,0,0]}/> */}

      <group position={armPos}>
        <BoundaryBox color="red" boundary={boundary} />
      </group>

      <ControlGuide ref={controlGuideRef}
        // initialConfig={gripper} 
      />

      {/* <group ref={controlGuideRef}>
        <Box args={[0.2,0.01,0.01]} material-color="red"/>
        <Box args={[0.01,0.2,0.01]} material-color="green"/>
        <Box args={[0.01,0.01,0.2]} material-color="blue"/>
        <axesHelper args={[0.5]}/>
      </group> */}
      
      {/* <Text fontSize={0.5} position={[-10,1,-10]} rotation={[0,45*DEG2RAD,0]} color="black">            
        {pos[0]}
      </Text>
      <Text fontSize={0.5} position={[-10,0,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        {pos[1]}
      </Text>
      <Text fontSize={0.5} position={[-10,-1,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        {pos[2]}
      </Text>
      <Text fontSize={0.5} position={[-10,-2,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        grip: {gripDistance}
      </Text> */}
      
    </group>
  )

}





const BoundaryBox = ({boundary, position, color, ...props}) => {
  const ref = useRef();
  
  useFrame((state,delta,XRFrame) => {
    if(XRFrame){
      //controller가 operation mode에서 바운더리 밖으로 나가면 경고하고 safe state 변경
      //이 로직은 portalarm의 useframe 내부에 있는게 나을듯 
    }
  })

  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      // onPointerOut={(event) => hover(false)}
        position={[(boundary[0][1]+boundary[0][0])/2, (boundary[1][1]+boundary[1][0])/2, (boundary[2][1]+boundary[2][0])/2]}
      >
      <boxGeometry 
        args={[boundary[0][1]-boundary[0][0], boundary[1][1]-boundary[1][0], boundary[2][1]-boundary[2][0],]} 
      />
      <meshStandardMaterial color={color} wireframe={true}/>
      {props.children}
    </mesh>
  )
}
