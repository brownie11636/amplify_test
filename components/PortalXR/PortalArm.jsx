import * as THREE from 'three'
import { forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Box } from "@react-three/drei"
import { useXR, useController } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

import { PortalCommContext } from '../../utils/contexts/portalComm';
import { useXRGamepadStore } from "../../store/zustand/XRGamepad.js"
import { useModeStore } from "../../store/zustand/mode.js"
import { useControlStore } from "../../store/zustand/control.js"

import Model from "./components/Model"

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

  const {commClientV01} = useContext(PortalCommContext);
  const ref = useRef();
  const squeezePressed_R = useRef({now:false, prev:false})
  const controllerMode = useRef(useModeStore.getState().controllerMode);
  const stickUp_R = useRef(useXRGamepadStore.getState().stickUp_R)
  const stickDown_R = useRef(useXRGamepadStore.getState().stickDown_R)
  const increaseGripDistance = useControlStore((state)=>state.increaseGripDistance);

  const rightController = useController('right');
  const leftController = useController('left');
  const [isSafe, setIsSafe] = useState(false);
  const boundary = [[-0.5,0.5],[0.6,0.2],[-0.6,0.1]]

  const armAngles = [60,-90,90,0,30,0]
  const [loader, setLoader] = useState(new GLTFLoader())
  const armRef = useRef([{},{},{},{},{},{},{}]);
  const gripperRef = useRef([{},{},{},{},{},{},{},{},{}]);
  const controlGuideRef = useRef();
  // const [conPos, setConPos]= useState(new THREE.Vector3);
  // const [conRot, setConRot]= useState(new THREE.Vector3);
  

  useEffect(() => {

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/3d_models/libs/draco/")
    setLoader((gltfLoader) => gltfLoader.setDRACOLoader(dracoLoader));
    
    console.log("socketid in PortalArm.jsx")
    console.log(commClientV01.socket.id)

    commClientV01.socket.on("robot",(type, packet)=>{
      console.log(type)
      console.log(packet)

      if(type === "C2C" && packet.msg.type === "_q"){
        useControlStore.setState({actualAngles_q:packet.msg.payload})
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
  let rot = [0,0,0];
  let ang = 60;
  let angles;
  let euler = new THREE.Euler();
  let posTest = new THREE.Vector3(1,1,1);
  let storeDistance
  let dir = 1
  let i = 0;
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
      gripperRef.current[0].getWorldQuaternion(
        controlGuideRef.current.rotation)
    }

    // ang += delta;
    useControlStore.setState({actualAngles_q:[ang*DEG2RAD,-90*DEG2RAD,90*DEG2RAD,0,30*DEG2RAD,0]})
    // useControlStore.setState({actualAngles_q:[60*DEG2RAD,-90*DEG2RAD,90*DEG2RAD,0,30*DEG2RAD,0]})
    // updateActualAngles_q([ang,-90,90,0,30,0])
    storeDistance = useControlStore.getState().gripDistance
    // console.log(storeDistance)
    if (storeDistance >= 100) dir = -1
    if (storeDistance <= 5) dir = 1 
    increaseGripDistance(dir*delta*10)

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

            if (squeezePressed_R.current === true){  //squeeze
              //controller 6DOF
              // let pos = ref.current.worldToLocal(
              //   right.controller.position.sub(armPosVec)).toArray();
              pos = armRef.current.children[0].worldToLocal(
                rightController.controller.position).toArray();
              // console.log(armRef.current.children[0]);
              pos = [-pos[0], pos[2], pos[1]]
              pos = pos.map((val) => Math.round(val*10000)/10000)
              euler.copy(rightController.controller.rotation)
              rot = rightController.controller.rotation.clone().reorder("XZY").toArray().map((val)=>Math.round(val*10000)/10000)
              // console.log(rot)
              // rot = 
              rot = [-rot[0]+(3.141592/2), rot[2], rot[1]]
              // console.log(typeof rot[0], typeof rot[1], typeof rot[2])

              packet = { 
                from: commClientV01.socket.id, 
                to:commClientV01.connectedModules[0],
                msg:{
                  type:"set_pos", 
                  data:{
                    arm:[...pos,...rot],
                    grip: Math.floor(gripDistance * 10) 
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

        if (stickUp_R === true || stickDown_R === true ) {
          if(stickUp_R === true) dir = 1;
          else if (stickDown_R) dir = -1;

          increaseGripDistance(dir * 30 * delta)
        }     
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

const Table = ({loader, children, ...props}) => {
  const modelConfig = {
    path: "/3d_models/portalarm/UR5e_ver/table/GLTFs/table.gltf",
    matParams: {
      color: 0xc5c5c5,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      flatShading: true,
    }
  }

  // const model = useLoader(STLLoader,'/3d_models/portalarm/UR5e_ver/table/STLs/table.STL')
  // console.log(model)


  return (
    <Model loader={loader} modelConfig={modelConfig} {...props}>
      {children}
    </Model>
    // <group {...props}>
    //   <mesh >    
    //     <primitive object={model} attach="geometry"/>
    //     <meshPhongMaterial {...modelConfig.matParams} />
    //   </mesh>
    //   {children}
    // </group>
  )
}
const ArmConfigs = setArmConfigs();

function setArmConfigs() {
  const configs_ = []

  for (let i = 0; i<9; i++){
    
    configs_.push({
      path: `/3d_models/portalarm/UR5e_ver/ALLZERO/UR5e/GLTFs/arm_${i}.gltf`,
      matParams:{
        color: 0xb0bef0,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        flatShading: true,
    }})
  }

  return configs_
}

// function Arm ({loader, index=0, angles=[0,0,0,0,0,0], positions, children, ...props}) {
const Arm = forwardRef( function Arm ({loader, index=0, angles=[0,0,0,0,0,0], positions, children, ...props}, forwardedRef) {

  const rotAxes = [
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, -1],
    [0, 0, -1],
    [0, -1, 0],
    [0, 0, -1],
  ];

  // const [rotation, setRotation] = useState([0,0,0]);
  const ref = useRef([]);

  useEffect(() => {
    // console.log(useControlStore.subscribe)
    const unsubAngles = useControlStore.subscribe(
      (state)=>state.actualAngles_q,
      (angles)=>{
        // console.log(state)
      for (let i=0; i<6; i++){
        forwardedRef.current[i + 2].rotation.fromArray(rotAxes[i].map((val) => val * angles[i]))
      }
    })
    console.log("arm index:",index)
    console.log("poses",props.positions)

    return () => unsubAngles();
  },[])

  useFrame((state,delta) => {
    // ref.current[2].rotation.z += 0.01;
    // console.log(angles)
    // angles.map((angle, i) => {
    //   // ref.current[i + 1].rotation.fromArray(rotAxes[i].map((val) => val * angle * DEG2RAD))
    //   forwardedRef.current[i + 1].rotation.fromArray(rotAxes[i].map((val) => val * angle * DEG2RAD))
    // })
  })

  return (
    <group ref={el => forwardedRef.current[0] = el}>
      <Model ref={el => (forwardedRef.current[1] = el)} loader={loader} position={positions[0]} modelConfig={ArmConfigs[0]}>
        <Model ref={el => (forwardedRef.current[2] = el)} loader={loader} position={positions[1]} modelConfig={ArmConfigs[1]}>
          <Model ref={el => (forwardedRef.current[3] = el)} loader={loader} position={positions[2]} modelConfig={ArmConfigs[2]}>
            <Model ref={el => (forwardedRef.current[4] = el)}loader={loader} position={positions[3]} modelConfig={ArmConfigs[3]}>
              <Model ref={el => (forwardedRef.current[5] = el)} loader={loader} position={positions[4]} modelConfig={ArmConfigs[4]}>
                <Model ref={el => (forwardedRef.current[6] = el)} loader={loader} position={positions[5]} modelConfig={ArmConfigs[5]}>
                  <Model ref={el => (forwardedRef.current[7] = el)} loader={loader} position={positions[6]} modelConfig={ArmConfigs[6]}>
                    {children}
                  </Model>
                </Model>
              </Model>
            </Model>
          </Model>
        </Model>
      </Model>
    </group>
 
  
  )
}
)


// /*  
//   gripperLinks configuration:
//   ROBOTIS RH-P12-RN:    // ⎟,⎿ means grouping structure in THREEJS
//   i   j   k   file  description      
//   0   -1  0   0     (body)  body_on_bracket
//   1   0   1   1-0   (right) ⎿ link_CLmirror_and_LR
//   2   0   2   2     (right) ⎿ link_1_and_2
//   3   0   3   3     (right) ⎟  ⎿ link_3
//   4   0   4   4     (right) ⎟     ⎿ RUB_ASM
//   5   1   1   1-1   (left)  ⎿ link_CL_and_LR
//   6   1   2   2     (left)  ⎿ link_1_and_2
//   7   1   3   3     (left)  ⎟  ⎿ link_3
//   8   1   4   4     (left)  ⎟     ⎿ RUB_ASM
// */

const gripperConfigs = setGripperConfigs();
const gripperPositions = setGripperPositions();

const Gripper = forwardRef(function Gripper({loader, geoConfig, children,...props},ref) {

  // const ref = useRef([]);
  // const gamepadRef = useContext(GamepadContext);
  const colorRef = useRef(0x999999)
  const [index, setIndex] = useState(0)

  const rotations = useMemo(() => {
    let rotations = []
    for (let i = 0; i<9; i++){

      let j = Math.floor((i - 1)/4);
      let k = 1 + (i - 1)% 4

      if (j === 1 && k === 2 ) rotations.push([0,0,THREE.MathUtils.DEG2RAD*180]);
      else rotations.push([0,0,0])
    } 
    return rotations
  })

  useEffect(()=>{
    grip(50, ref.current);
    const unsubGrip = useControlStore.subscribe(
      (state)=>state.gripDistance,
      (distance)=>grip(distance, ref.current));
      // (state)=>[state.actualAngles_q,state.gripDistance],
      // ([angles,distance])=>{
      //   console.log(angles)
      //   console.log(distance)
      // });
    return () => unsubGrip();
  },[])

  useEffect(() => console.log("gripper is rendered"),)

  useFrame((state,delta,XRFrame)=>{
        
    // if (gamepadRef.current.right.new.buttons[4] !== gamepadRef.current.right.prev.buttons[4] 
    //   && gamepadRef.current.right.new.buttons[4] > 0.8){
    //   ref.current[0].traverse((obj) => {
    //     // if (obj.type === "Mesh") obj.material.color.set(direction === 1 ? 0x777777 : 0x999999 );
    //     if (obj.type === "Mesh") obj.material.color.set(colorRef.current);
    //   });
    //   colorRef.current = colorRef.current === 0x777777 ? 0x999999 : 0x777777;
    //   setIndex((i)=>i+1)
    // }    
    // if ( distance < 1 || distance > 105) {
    //   console.error("gripeer: out of range")
    // } else {
    //   let angle = RAD2DEG * Math.asin(( disa))
    // }
  })
  
  return(
    <>
      {/* <Text fontSize={0.5} position={[-10,-3,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        {gamepadRef.current.right.new.buttons[4]}
      </Text> */}
      <Model ref={el=>(ref.current[0]=el)} loader={loader} modelConfig={gripperConfigs[0]} position={gripperPositions[0]} rotation={rotations[0]}>
        <Model ref={el=>(ref.current[1]=el)} loader={loader} modelConfig={gripperConfigs[1]} position={gripperPositions[1]} rotation={rotations[1]}/>
        <Model ref={el=>(ref.current[2]=el)} loader={loader} modelConfig={gripperConfigs[2]} position={gripperPositions[2]} rotation={rotations[2]}>
          <Model ref={el=>(ref.current[3]=el)} loader={loader} modelConfig={gripperConfigs[3]} position={gripperPositions[3]} rotation={rotations[3]}>
            <Model ref={el=>(ref.current[4]=el)} loader={loader} modelConfig={gripperConfigs[4]} position={gripperPositions[4]} rotation={rotations[4]}/>
          {children}
          </Model>
        </Model>
        <Model ref={el=>(ref.current[5]=el)} loader={loader} modelConfig={gripperConfigs[5]} position={gripperPositions[5]} rotation={rotations[5]}/>
        <Model ref={el=>(ref.current[6]=el)} loader={loader} modelConfig={gripperConfigs[6]} position={gripperPositions[6]} rotation={rotations[6]}>
          <Model ref={el=>(ref.current[7]=el)} loader={loader} modelConfig={gripperConfigs[7]} position={gripperPositions[7]} rotation={rotations[7]}>
            <Model ref={el=>(ref.current[8]=el)} loader={loader} modelConfig={gripperConfigs[8]} position={gripperPositions[8]} rotation={rotations[8]}/>
          </Model>
        </Model>

      </Model>
    </>
  )
})

function setGripperPositions() {
  const gripperGeometries = [
    [0, 0, -0.0533],
    [0.01861, 0, -0.04739],
    [0.008, 0, -0.058],
    [0, 0, -0.05694],
    [0, 0, 0],
  ];
  let positions_ = [];
  for (let i = 0; i<9; i++){

    let j = Math.floor((i - 1)/4);
    let k = 1 + (i - 1)% 4

    if (j === 0) positions_.push([gripperGeometries[k][0],gripperGeometries[k][1],gripperGeometries[k][2]]) 
    else positions_.push([ - gripperGeometries[k][0],gripperGeometries[k][1],gripperGeometries[k][2]])
  }
  return positions_
}

function setGripperConfigs() {
  const configs_ = []

    for (let i = 0; i<9; i++){
  
      let j = Math.floor((i - 1)/4);
      let k = 1 + (i - 1)% 4
      
      configs_.push({
        // path: null,
        matParams:{
          color: 0x777777,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide,
          flatShading: true,
      }})
  
      if ( i === 0 ) configs_[i].path = `/3d_models/portalarm/UR5e_ver/ALLZERO/RH-P12-RN/GLTFs/${i}.gltf`;
      else {
        if (k === 1) configs_[i].path = `/3d_models/portalarm/UR5e_ver/ALLZERO/RH-P12-RN/GLTFs/${k}-${j}.gltf`;
        else configs_[i].path = `/3d_models/portalarm/UR5e_ver/ALLZERO/RH-P12-RN/GLTFs/${k}.gltf`;
      }
    }  
    return configs_
}

const grip = (distance, gripperLinks, type = "ROBOTIS_RH-P12-RN") => {
  if ( type === "ROBOTIS_RH-P12-RN" ){
    if ( distance < 1 || distance > 105) {
      console.error("gripper: out of range", distance);
      return;
    } else {
      // console.log("gripDistance:", distance)
      let angle = RAD2DEG * Math.asin(( distance - 8 ) / 2 / 57);
      for (let i = 1; i < 8; i++ ){
        let j = Math.floor((i - 1)/4);
        let k = 1 + (i - 1)% 4
        let rot = 2 * (j - 0.5) * angle * DEG2RAD; 
        if ( k < 3) gripperLinks[i].rotation.y = rot; 
        else if (k === 3) gripperLinks[i].rotation.y = angle * DEG2RAD;
      } 
    } 
  } else {
    console.error("not registed gripper");
    return;
  }
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

/**
 * squeeze 했을때만 controller와 6dof 동기화 
 * socket명령을 보낼때는 armbase(armRef[0])와의 상대위치를 보내야하니까 상위 컴포넌트에서 보냄
 * 축 고정 및 정렬 등과 같은 상태값에따른 거동은 컴포넌트 내에서 처리
 * 
 * align시에 포지션 및 로테이션이 바뀔텐데 이전 값도 갖고 있어야함 squeeze가 풀리면 해당작업을 하도록 함 
 * nonAlignedStateRef.current에 이전값을 저장하고 이걸 기준으로 rotation을 set하는 걸로
 * 이 값은 컨트롤러가 아니라 로봇의 state를 저장하고 있는걸로 볼 수 있음
 * 
 * 처리했음 - 초기 rotation 및 position 세팅은 gripper의 위치 참조해서 상위 컴포넌트에서 설정함.
 * align시에 가까운 방향으로 정렬하게 해야함
 */
const ControlGuide = forwardRef( function ControlGuide ({ initialConfig, ...props}, ref) {
  if (!ref) ref = useRef();
  
  const rightController = useController('right');
  const squeezePressed_R = useRef({now:false, prev:false})

  const controlRef = useRef();
  const initialRotationRef = useRef();
  const globalAxisRef = useRef();


  const translatingAxesRef = useRef(useModeStore.getState().translatingAxes);
  const rotatingAxesRef = useRef(useModeStore.getState().rotatingAxes);
  const alignedAxesRef = useRef(useModeStore.getState().alignedAxes);
  const coordinateRef = useRef(useModeStore.getState().coordinate)

  // const convertAxisToStr = (axisNum,option = "upper") => {
  //   if (option === "upper") axisNum += 88
  //   else if (option === "lower") axisNum += 120
    
  //   return String.fromCharCode(axisNum)
  // }

  const rotatingOrder = useRef("XYZ");
  const getRotatingOrder = (rotatingAxes, alignIndex, coordinate) => {
    let end = ""
    let order = ""
    let isBase = (coordinate === "base"); //true @ base, false @ TCP
    // console.log(isBase)
    
    order = rotatingAxes.reduce((a,c,i)=> {
      if (c === isBase) return a + String.fromCharCode(i+88);
      else {
        end = end + String.fromCharCode(i+88);
        return a
      }
    },"")


    // 3 free rotating axis -> XYZ
    // 1 free rotating axis -> free, fixed, fixed
    // if(alignIndex === 0) {
      // order = rotatingAxes.reduce((a,c,i)=> {
      //   if (c === true) return a + String.fromCharCode(i+88);
      //   else {
      //     end = end + String.fromCharCode(i+88);
      //     return a
      //   }
      // },"")
    // }

    // 1 aligned axis -> fixed, fixed, aligned(free or fixed)
    // 2 aligned axis -> fixed, fixed aligned, fixed aligned
    // 3 aligned axis -> fixed aligned, fixed aligned, fixed aligned
    // if(alignIndex > 0){
    //   order = rotatingAxes.reduce((a,c,i)=> {
    //     if (c !== true) return a + String.fromCharCode(i+88);
    //     else {
    //       end = end + String.fromCharCode(i+88);
    //       return a
    //     }
    //   },"")
    // }

    return order + end;
  }
  
  const getAlignIndex = (alignedAxes) => alignedAxes.reduce((a,c) => a + c);
  const alignIndex = useRef({now:getAlignIndex(alignedAxesRef.current), prev:0})
  const needAlignAngle = useRef(false);
  const alignAngle = useRef([]);
  const alignUnitAngle = useRef(0.5*Math.PI)
  const alignOrder = useRef([])

  const controllerModeRef = useRef(useModeStore.getState().controllerModeRef)

  const nonAlignedRef = useRef(new THREE.Euler);

  useEffect(()=>{
    const unsubXRGamepadStore = useXRGamepadStore.subscribe((state) => {
      squeezePressed_R.current.prev = squeezePressed_R.current.now;
      squeezePressed_R.current.now = state.squeezePressed_R
    })

    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        // console.log("changed!!!")
        // console.log(state)
        // console.log(prevState)
        // console.log(aaa)
        controllerModeRef.current = state.controllerMode;

        translatingAxesRef.current = state.translatingAxes;
        rotatingAxesRef.current = state.rotatingAxes;
        alignedAxesRef.current = state.alignedAxes;
        coordinateRef.current = state.coordinate;

        alignIndex.current.prev = alignIndex.current.now
        alignIndex.current.now = getAlignIndex(state.alignedAxes);

        rotatingOrder.current = getRotatingOrder(
          rotatingAxesRef.current, 
          alignIndex.current.now,
          coordinateRef.current);
        // console.log(state)
        ref.current.rotation.reorder(rotatingOrder.current)
        // console.log(rotatingOrder.current)


        console.log(alignIndex.current)

        // let alignChanged = state.alignedAxes.reduce((a,c,i) => {
        //   if( c === prevState.alignedAxes[i] ) return a;
        //   else return [...a,i]
        // },[]);
        // console.log(alignChanged)

        if (alignIndex.current.now !== alignIndex.current.prev){ 
          
        //   alignOrder.current.push(...alignChanged)
          needAlignAngle.current = true;
          if (alignIndex.current.prev === 0) nonAlignedRef.current.copy(ref.current.rotation.clone());

        // } else if (alignIndex.current.now < alignIndex.current.prev){ // decrease
            
        //   for(let i = 0; i < alignChanged.length; i++) {
        //     for(let j = 0; j < alignOrder.current.length; j++){
        //       if(alignOrder.current[j] === alignChanged[i]){
        //         alignOrder.current.splice(j, 1);
        //         j--;
        //       }
        //     }
        //   }
        }
        console.log(needAlignAngle.current)
      }
    )
    
    return () => {
      unsubXRGamepadStore();
      unsubModeStore();
    }
  },[])

  const controller = {
    localPosition: new THREE.Vector3, 
    alignedRotation: new THREE.Euler,
  }
  
  let axis = "";
  let order = "";
  let tmp_q = new THREE.Quaternion;

  useFrame((state,delta,xrFrame) => {
    if (rightController){
      if (!squeezePressed_R.current.now){

        //convert 
        controller.localPosition.copy(
          ref.current.parent.worldToLocal(
            rightController.controller.position))

        translatingAxesRef.current.forEach((val,i) => {
          axis = String.fromCharCode(i+120);  //ascii of x,y,z are 120, 121, 122
          if ( val === true ) {     
            ref.current.position[axis] = controller.localPosition[axis] 
          }
        })

        /**
         * alignIndex === 0
         *  free axis 갯수에 따라서 오일러 각도 계산 순서 바꿔가면서 계산
         *    free axis 3개 -> 그냥 그대로
         *    free axis 2개 -> 자유로운 축을 먼저 계산 -> 생략
         *    free axis 1개 -> 자유로운 축을 먼저 계산
         * alignIndex === 1
         *  어차피 free axis 갯수 한개
         *  align 된 걸 나중에 계산 order: fix,fix,aligned(free)
         * 
         * 먼저 aligneIndex > 1 일때 order 랑 align 각도들 정해주고
         * 그다음에 일괄적으로 freeaxis 갯수따라서 계산 진행하면 될듯
         * 
         * 
         * reorder
         */
        // if ( alignIndex.current.now > 0 ) {  // 1 aligned axis -> 2 fixed angle  // 2 axis aligned axis -> 3 fixed angle
        // if ( alignIndex.current.now > 0 && alignIndex.current.now < 3 ) {  // 1 aligned axis -> 2 fixed angle  // 2 axis aligned axis -> 3 fixed angle
          // console.log(alignIndex)
        if(needAlignAngle.current){
          alignAngle.current = [0,0,0];
          console.log(alignIndex.current.now)
          console.log(rotatingOrder.current)
          for (let i=0;i<1+alignIndex.current.now;i++){

            if (coordinateRef.current === "TCP"){
              axis = rotatingOrder.current.toLowerCase().slice(i,i+1)
            } else if (coordinateRef.current === "base"){
              axis = rotatingOrder.current.toLowerCase().slice(2-alignIndex.current.now+i,2-alignIndex.current.now+i+1)
            }
            // console.log(2-alignIndex.current.now+i)
            // console.log(axis)

            alignAngle.current[i] = (ref.current.rotation[axis] + 2.0*Math.PI) % alignUnitAngle.current;
            
            if( alignAngle.current[i] > 0.5*alignUnitAngle.current ) alignAngle.current[i] -= alignUnitAngle.current;

            ref.current.rotation[axis] -= alignAngle.current[i];
            // console.log(controller.alignedRotation)
            // console.log(controller.alignedRotation[axis])

            // console.log("dasfd")

            // if( alignAngle.current[i] > 0.5*alignUnitAngle.current ) ref.current.rotation[axis] += alignUnitAngle.current;
            
            
            // ref.current.rotation[axis] = controller.alignedRotation[axis];
            console.log(axis,": ",ref.current.rotation[axis]*RAD2DEG)

          }
          needAlignAngle.current = false;
        }
        // }

        rightController.controller.getWorldQuaternion(controller.alignedRotation)
        controller.alignedRotation.reorder(rotatingOrder.current)
        // console.log("dsfasd")
        rotatingAxesRef.current.forEach((val,i) => {
          axis = String.fromCharCode(i+120);  //ascii of x,y,z are 120, 121, 122
          if ( val === true ) {     
            ref.current.rotation[axis] = controller.alignedRotation[axis] 
            // console.log(ref.current.rotation[axis]*RAD2DEG)
          }
          console.log(axis,": ",ref.current.rotation[axis]*RAD2DEG)
          console.log(rotatingAxesRef.current);
        })

      } else {

      }
    }
    // ref.current.getWorldQuaternion(tmp_q)
    // globalAxisRef.current.rotation.setFromQuaternion(ref.current.getWorldQuaternion().invert())
    globalAxisRef.current.rotation.setFromQuaternion(ref.current.getWorldQuaternion(tmp_q).invert())
  })

  return (
    <group ref={controlRef} >
      <group ref={initialRotationRef} >
        <group ref={ref} {...props} >
          <Box args={[0.2,0.01,0.01]} position={[0.05, 0, 0]} material-color="red"/>
          <Box args={[0.01,0.2,0.01]} position={[0, 0.05, 0]} material-color="green"/>
          <Box args={[0.01,0.01,0.2]} position={[0, 0, 0.05]} material-color="blue"/>

          {/* <Box args={[0.2,0.01,0.01]} material-color="red"/>
          <Box args={[0.01,0.2,0.01]} material-color="green"/>
          <Box args={[0.01,0.01,0.2]} material-color="blue"/> */}
          <axesHelper ref={globalAxisRef} args={[0.5]}/>
        </group>
      </group>
    </group>
  );
});
