import * as THREE from 'three'
import { forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from "@react-three/drei"
import { useXR } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { PortalCommContext } from '../../utils/contexts/portalComm';
import * as myGamepadInput from '../../libs/XR/myGamepadInput'
import { GamepadContext } from './GamepadContext'

import Box from './boxes'

export default function PortalArm(type, path, ...props) {

  const commClient = useContext(PortalCommContext);
  const gamepadRef = useContext(GamepadContext);

  const armPos =  [0, 0.717, 0]
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


  const [armAngles, setArmAngles] = useState([0,0,0,0,0,0])
  const [loader, setLoader] = useState(new GLTFLoader())
  const armRef = useRef();

  const {commClientV01} = useContext(PortalCommContext)

  useEffect(() => {

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/3d_models/libs/draco/")
    setLoader((gltfLoader) => gltfLoader.setDRACOLoader(dracoLoader));
    console.log("dakljfasd")
    //commClient.socket callback -> 명령 들어왓을때 setArmAngles하기
    //commClient.socket callback -> 명령 들어왓을때 setGripperAngles하기

    return () => {

    }
  }, []);

  //socket io callback을 붙히기
  useFrame((state, delta)=> { 
    if(gamepadRef.current.left.new.buttons[0] === 0){
      setArmAngles(armAngles => armAngles.map(val=>val+0.3));
    } else {
      setArmAngles(armAngles => armAngles.map(val=>val-0.3));
    }
  })

  return(
    <group>
      <Table loader={loader}>
        <Arm loader={loader} depth={6} angles={armAngles} positions={[armPos,...armGeometries]}>
          <Gripper loader={loader} geoConfig={gripperGeometries} />
        {/* <Box position={[-1.2, 0, 0]} /> */}
        </Arm>
      </Table> 
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
    // }

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

const Table = ({loader, children, position, ...props}) => {
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

  return (
    <Model loader={loader} modelConfig={modelConfig} position={position}>
      {children}
    </Model>
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
const Arm = ({loader, index=0, angles=[0,0,0,0,0,0],positions, children, ...props}) => {

  const rotAxes = [
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, -1],
    [0, 0, -1],
    [0, -1, 0],
    [0, 0, -1],
  ];

  const [rotation, setRotation] = useState([0,0,0]);
  const ref = useRef([]);
  useEffect(() => {
    console.log("arm index:",index)
    console.log("poses",props.positions)
    console.log("refref")
    console.log(ref.current[0])
  },[])

  useFrame((state,delta) => {
    if (index > 0){
      // console.log("rotrot")
      // console.log(modelRef)
      // modelRef.current.rotation.fromArray(rotAxes[index-1].map((val,idx) => val * angles[index-1] * THREE.MathUtils.DEG2RAD));
      // console.log("angles in arms[",index,"]: ",rotation)
    }
  })

  return (
    <Model ref={el => (ref.current[0] = el)} loader={loader} 
    rotation={rotation} position={positions[0]} modelConfig={ArmConfigs[0]}>

      <Model ref={el => (ref.current[1] = el)} loader={loader} 
      rotation={rotation} position={positions[1]} modelConfig={ArmConfigs[1]}>

        <Model ref={el => (ref.current[2] = el)} loader={loader} 
        rotation={rotation} position={positions[2]} modelConfig={ArmConfigs[2]}>

          <Model ref={el => (ref.current[3] = el)}loader={loader} 
          rotation={rotation} position={positions[3]} modelConfig={ArmConfigs[3]}>

            <Model ref={el => (ref.current[4] = el)} loader={loader} 
            rotation={rotation} position={positions[4]} modelConfig={ArmConfigs[4]}>

              <Model ref={el => (ref.current[5] = el)} loader={loader} 
              rotation={rotation} position={positions[5]} modelConfig={ArmConfigs[5]}>

                <Model ref={el => (ref.current[6] = el)} loader={loader} 
                rotation={rotation} position={positions[6]} modelConfig={ArmConfigs[6]}>
                  {children}
                </Model>
              </Model>
            </Model>
          </Model>
        </Model>
      </Model>
      
    </Model>
 
  
  )
}

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

const Gripper = ({loader, geoConfig, children,...props}) => {

  const [rotations, setRotations] = useState(() => {
    let rotations_ = []
    for (let i = 0; i<9; i++){

      let j = Math.floor((i - 1)/4);
      let k = 1 + (i - 1)% 4

      if (j !== 0 && k !== 1) rotations_.push([0,0,THREE.MathUtils.DEG2RAD*180]);
      else rotations_.push([0,0,0])
    } 
    return rotations_
  })
  
  return(
    <Model loader={loader} modelConfig={gripperConfigs[0]} position={gripperPositions[0]} rotations={rotations[0]}>

      <Model loader={loader} modelConfig={gripperConfigs[1]} position={gripperPositions[1]} rotations={rotations[1]}/>
      <Model loader={loader} modelConfig={gripperConfigs[2]} position={gripperPositions[2]} rotations={rotations[2]}>
        <Model loader={loader} modelConfig={gripperConfigs[3]} position={gripperPositions[3]} rotations={rotations[3]}>
          <Model loader={loader} modelConfig={gripperConfigs[4]} position={gripperPositions[4]} rotations={rotations[4]}/>
        {children}
        </Model>
      </Model>
      <Model loader={loader} modelConfig={gripperConfigs[5]} position={gripperPositions[5]} rotations={rotations[5]}/>
      <Model loader={loader} modelConfig={gripperConfigs[6]} position={gripperPositions[6]} rotations={rotations[6]}>
        <Model loader={loader} modelConfig={gripperConfigs[7]} position={gripperPositions[7]} rotations={rotations[7]}>
          <Model loader={loader} modelConfig={gripperConfigs[8]} position={gripperPositions[8]} rotations={rotations[8]}/>
        </Model>
      </Model>

    </Model>
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
          color: 0xc5c5c5,
          transparent: true,
          opacity: 0.5,
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