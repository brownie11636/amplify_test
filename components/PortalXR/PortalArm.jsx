import * as THREE from 'three'
import { forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Html, Text } from "@react-three/drei"
import { useXR, useController } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

import { PortalCommContext } from '../../utils/contexts/portalComm';
import * as myGamepadInput from '../../libs/XR/myGamepadInput'
import { GamepadContext } from './GamepadContext'

import Box from './boxes'
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
  const gamepadRef = useContext(GamepadContext);
  const ref = useRef();
  const {controllers} = useXR();

  const rightController = useController('right');
  const leftController = useController('left');
  const [isSafe, setIsSafe] = useState(false);
  const boundary = [[-0.5,0.5],[0.6,0.2],[-0.6,0.1]]

  const [armAngles, setArmAngles] = useState([60,-90,90,0,30,0])
  const [loader, setLoader] = useState(new GLTFLoader())
  const armRef = useRef([]);
  const [conPos, setConPos]= useState(new THREE.Vector3);
  const [conRot, setConRot]= useState(new THREE.Vector3);
  const [gripDistance, setGripDistance] = useState(50);
  const [gripDirection, setGripDirection] = useState(1);

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
        console.log("get_q")
        setArmAngles((angles)=> {
          let result = packet.msg.payload.map(val=>val*RAD2DEG)
          console.log(result)
          return result
        });
      }
    })

    if(commClientV01.connectedModules){
      //request _q msg (robot joint angles)
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

    console.log("robot comm on")
    
    return () => {
      commClientV01.socket.off("robot")
      console.log("robot comm off")
    }
  }, []);

  //socket io callback을 붙히기
  useFrame((state, delta, XRFrame)=> { 
    if(XRFrame){
      // console.log(delta)
      acculTime += delta
      // console.log(delta)
      if (acculTime > 0.05){
        // console.log(acculTime)
        acculTime = 0
        let right = {...gamepadRef.current.right};
  
        if (right.new.buttons[1] === 1){  //squeeze
          //controller 6DOF
          if(rightController){
            right.controller = rightController.controller;
            // let pos = ref.current.worldToLocal(
            //   right.controller.position.sub(armPosVec)).toArray();
            let pos = armRef.current.children[0].worldToLocal(
              right.controller.position).toArray();
            // console.log(armRef.current.children[0]);
            pos = [-pos[0], pos[2], pos[1]]
            pos = pos.map((val) => Math.round(val*10000)/10000)
            setConPos(pos);

            let rot = right.controller.rotation.clone().reorder("XZY").toArray().map((val)=>Math.round(val*10000)/10000)
            // console.log(rot)
            rot = [-rot[0]+(3.141592/2), rot[2], rot[1]]
            // console.log(typeof rot[0], typeof rot[1], typeof rot[2])
            setConRot(rot)
          }

          packet = { 
            from: commClientV01.socket.id, 
            to:commClientV01.connectedModules[0],
            msg:{
              type:"set_pos", 
              data:{
                arm:[...conPos,...conRot],
                grip: Math.floor(gripDistance * 10) 
              }
            }
          } 
          console.log("send C2C packet")
          // console.log(packet.msg.data.arm);
          commClientV01.socket.emit("robot", "C2C", packet, (res) => {
          // console.log("msg-v0 response:",res)
          } )
        }
        if (right.new.buttons[5] !== right.prev.buttons[5] 
          &&right.new.buttons[5] > 0.8){
          packet = { 
            from: commClientV01.socket.id, 
            to:commClientV01.connectedModules[0],
            msg: {
              type:"get_pos"
            } 
          }
          commClientV01.socket.emit("robot","C2C",packet)        
          console.log("request robot angles")
          console.log(packet)
        }



        if (right.new.buttons[4] !== right.prev.buttons[4] 
            &&right.new.buttons[4] > 0.8){
          setGripDirection((direction) => - direction);
        }
        if (right.new.buttons[0] > 0.5) {
          setGripDistance((distance) => {
            let result = (distance + 30* delta * gripDirection)
            if (result > 100) return 100;
            else if (result < 1) return 1;
            else return result
          })
        }

        
        // setGripDistance((grip)=> {
        //   if ( grip > 100) dir = -dir;
        //   else if ( grip < 2 ) dir = -dir;
        //   return grip + dir;
        // })

        // let armData = [...conPos, ...conRot]
        // console.log (armData)
     

        
  
        // if(gamepadRef.current.left.new.buttons[0] === 0){
        //   setArmAngles(armAngles => armAngles.map(val=>val+0.3));
        // } else {
        //   // console.log(gamepadRef.current.left)
        //   setArmAngles(armAngles => armAngles.map(val=>val-0.3));
        // }
      }
    }

  })

  return(
    <group ref={ref}>
      <Table loader={loader}>
        {/* <Arm ref={armRef} loader={loader} depth={6} angles={armAngles} positions={[armPos,...armGeometries]}>
          <Gripper loader={loader} geoConfig={gripperGeometries} gripDistance={gripDistance}/>
        </Arm> */}
      </Table> 
      <Table loader={loader} position={[1,0,0]}/>
      <Table loader={loader} position={[2,0,0]}/>
      <group position={armPos}>
        <BoundaryBox color="red" boundary={boundary}/>
      </group>

      <Text fontSize={0.5} position={[-10,1,-10]} rotation={[0,45*DEG2RAD,0]} color="black">            
        {conPos[0]}
      </Text>
      <Text fontSize={0.5} position={[-10,0,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        {conPos[1]}
      </Text>
      <Text fontSize={0.5} position={[-10,-1,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        {conPos[2]}
      </Text>
      <Text fontSize={0.5} position={[-10,-2,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        grip: {gripDistance}
      </Text>
      
    </group>
  )

}

const Model = forwardRef( function Model ({loader, modelConfig, position=[0,0,0], rotation=[0,0,0], ...props}, forwardedRef) {

  const path = modelConfig.path
  const [geo,setGeo] = useState(new THREE.BufferGeometry);

  useEffect(()=>{
    // console.log("modelConfig")
    // console.log(modelConfig)
    const loadGLTF = async () => {
      console.log("paaaaaath",path)
      let gltf = await loader.loadAsync(path);
      setGeo((geo_) => geo_ = gltf.scene.children[0].geometry) ;
    }

    // const loadGLTF =  () => {
    //   console.log("paaaaaath",path)
    //   // let gltf =  
    //   loader.load(path,(gltf) =>{
    //     setGeo((geo_) => geo_ = gltf.scene.children[0].geometry) ;
    //   } 
    //   );
    // 

    loadGLTF();

    console.log("model loaded")
    
  },[])

  return (
    <group ref={forwardedRef} position={position} rotation={rotation} >
      <mesh >    
     {/* <group > */}
      {/* <mesh ref={forwardedRef} position={position} rotation={rotation} > */}
        {/* <primitive object={gltf.scene.children[0].geometry} attach="geometry"/> */}
        <primitive object={geo} attach="geometry"/>
        <meshPhongMaterial {...modelConfig.matParams} />
      </mesh>
      {props.children}
    </group>
  );
});

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
    console.log("arm index:",index)
    console.log("poses",props.positions)
    console.log("refref")
    console.log(ref.current[0])
  },[])

  useFrame((state,delta) => {
    // ref.current[2].rotation.z += 0.01;
    angles.map((angle, i) => {
      ref.current[i + 1].rotation.fromArray(rotAxes[i].map((val) => val * angle * DEG2RAD))
    })
  })

  return (
    <group ref={forwardedRef}>
      <Model ref={el => (ref.current[0] = el)} loader={loader} 
      position={positions[0]} modelConfig={ArmConfigs[0]}>

        <Model ref={el => (ref.current[1] = el)} loader={loader} 
        position={positions[1]} modelConfig={ArmConfigs[1]}>

          <Model ref={el => (ref.current[2] = el)} loader={loader} position={positions[2]} modelConfig={ArmConfigs[2]}>

            <Model ref={el => (ref.current[3] = el)}loader={loader} position={positions[3]} modelConfig={ArmConfigs[3]}>

              <Model ref={el => (ref.current[4] = el)} loader={loader} position={positions[4]} modelConfig={ArmConfigs[4]}>

                <Model ref={el => (ref.current[5] = el)} loader={loader} position={positions[5]} modelConfig={ArmConfigs[5]}>

                  <Model ref={el => (ref.current[6] = el)} loader={loader} position={positions[6]} modelConfig={ArmConfigs[6]}>
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

// const Arm = ({ index=0, angles=[0,0,0,0,0,0], ...props}) => {

//   const rotAxes = [
//     [0, 1, 0],
//     [0, 0, -1],
//     [0, 0, -1],
//     [0, 0, -1],
//     [0, -1, 0],
//     [0, 0, -1],
//   ];

//   const [rotation, setRotation] = useState([0,0,0]);
//   const modelRef = useRef();
//   useEffect(() => {
//     console.log("arm index:",index)
//     console.log("poses",props.positions)
//     console.log("refref")
//     console.log(modelRef)
//   },[])

//   useFrame((state,delta) => {
//     if (index > 0){
//       // console.log("rotrot")
//       // console.log(modelRef)
//       modelRef.current.rotation.fromArray(rotAxes[index-1].map((val,idx) => val * angles[index-1] * THREE.MathUtils.DEG2RAD));
//       // console.log("angles in arms[",index,"]: ",rotation)
//     }
//   })

//   return (
//     <Model 
//     ref={modelRef}
//     rotation={rotation}
//     loader={props.loader} 
//     position={props.positions[index]}
//     modelConfig={{
//       path:`/3d_models/portalarm/UR5e_ver/ALLZERO/UR5e/GLTFs/arm_${index}.gltf`,
//       matParams:{
//         color:0xb0bef0,   //0xb0bef0로 쓰면 안됨
//         transparent:true ,
//         opacity:0.5,
//         flatShading:true,
//         side:THREE.DoubleSide, 
//     }}}>
//       { 
//       props.depth === index ? 
//         props.children 
//         : 
//         <Arm 
//         // loader={loader} 
//         // depth={depth} 
//         index={index+1}
//         angles={angles}
//         {...props} />  
//       }
//     </Model>
//   )
// }

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

const gripperConfigs =setGripperConfigs();
const gripperPositions = setGripperPositions();

const Gripper = ({loader, geoConfig, gripDistance, children,...props}) => {

  const ref = useRef([]);
  const gamepadRef = useContext(GamepadContext);
  const colorRef = useRef(0x999999)
  const [index, setIndex] = useState(0)

  const [rotations, setRotations] = useState(() => {
    let rotations_ = []
    for (let i = 0; i<9; i++){

      let j = Math.floor((i - 1)/4);
      let k = 1 + (i - 1)% 4

      if (j === 1 && k === 2 ) rotations_.push([0,0,THREE.MathUtils.DEG2RAD*180]);
      else rotations_.push([0,0,0])
    } 
    return rotations_
  })

  useFrame((state,delta,XRFrame)=>{
    
    grip(gripDistance, ref.current)
    
    if (gamepadRef.current.right.new.buttons[4] !== gamepadRef.current.right.prev.buttons[4] 
      && gamepadRef.current.right.new.buttons[4] > 0.8){
      ref.current[0].traverse((obj) => {
        // if (obj.type === "Mesh") obj.material.color.set(direction === 1 ? 0x777777 : 0x999999 );
        if (obj.type === "Mesh") obj.material.color.set(colorRef.current);
      });
      colorRef.current = colorRef.current === 0x777777 ? 0x999999 : 0x777777;
      setIndex((i)=>i+1)
    }    
    // if ( distance < 1 || distance > 105) {
    //   console.error("gripeer: out of range")
    // } else {
    //   let angle = RAD2DEG * Math.asin(( disa))
    // }
  })
  
  return(
    <>
      <Text fontSize={0.5} position={[-10,-3,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        {gamepadRef.current.right.new.buttons[4]}
      </Text>
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
}

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