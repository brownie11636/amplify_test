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

  return (
    <Model loader={loader} modelConfig={modelConfig}>
      {children}
    </Model>
  )
}


const Arm = ({ index=0, angles=[0,0,0,0,0,0], ...props}) => {

  const rotAxes = [
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, -1],
    [0, 0, -1],
    [0, -1, 0],
    [0, 0, -1],
  ];

  const [rotation, setRotation] = useState([0,0,0]);
  const modelRef = useRef();
  useEffect(() => {
    console.log("arm index:",index)
    console.log("poses",props.positions)
    console.log("refref")
    console.log(modelRef)
  },[])

  useFrame((state,delta) => {
    if (index > 0){
      // console.log("rotrot")
      // console.log(modelRef)
      modelRef.current.rotation.fromArray(rotAxes[index-1].map((val,idx) => val * angles[index-1] * THREE.MathUtils.DEG2RAD));
      // console.log("angles in arms[",index,"]: ",rotation)
    }
  })

  return (
    <Model 
    ref={modelRef}
    rotation={rotation}
    loader={props.loader} 
    position={props.positions[index]}
    modelConfig={{
      path:`/3d_models/portalarm/UR5e_ver/ALLZERO/UR5e/GLTFs/arm_${index}.gltf`,
      matParams:{
        color:0xb0bef0,   //0xb0bef0로 쓰면 안됨
        transparent:true ,
        opacity:0.5,
        flatShading:true,
        side:THREE.DoubleSide, 
    }}}>
      { 
      props.depth === index ? 
        props.children 
        : 
        <Arm 
        // loader={loader} 
        // depth={depth} 
        index={index+1}
        angles={angles}
        {...props} />  
      }
    </Model>
  )
}

    /*  
      gripperLinks configuration:
      ROBOTIS RH-P12-RN:    // ⎟,⎿ means grouping structure in THREEJS
      i   j   k   file  description      
      0   -1  0   0     (body)  body_on_bracket
      1   0   1   1-0   (right) ⎿ link_CLmirror_and_LR
      2   0   2   2     (right) ⎿ link_1_and_2
      3   0   3   3     (right) ⎟  ⎿ link_3
      4   0   4   4     (right) ⎟     ⎿ RUB_ASM
      5   1   1   1-1   (left)  ⎿ link_CL_and_LR
      6   1   2   2     (left)  ⎿ link_1_and_2
      7   1   3   3     (left)  ⎟  ⎿ link_3
      8   1   4   4     (left)  ⎟     ⎿ RUB_ASM
    */
   
const Gripper = ({loader, geoConfig, ...props}) => {

  const [configs, setConfigs] = useState(() => {

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
  })
  
  const [positions, setPositions] = useState(() => {

    let positions_ = [];
    for (let i = 0; i<9; i++){

      let j = Math.floor((i - 1)/4);
      let k = 1 + (i - 1)% 4

      if (j === 0) positions_.push([geoConfig[k][0],geoConfig[k][1],geoConfig[k][2]]) 
      else positions_.push([ - geoConfig[k][0],geoConfig[k][1],geoConfig[k][2]])
    }
    return positions_
  })

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
    <Model loader={loader} modelConfig={configs[0]} position={positions[0]} rotations={rotations[0]}>

      <Model loader={loader} modelConfig={configs[1]} position={positions[1]} rotations={rotations[1]}/>
      <Model loader={loader} modelConfig={configs[2]} position={positions[2]} rotations={rotations[2]}>
        <Model loader={loader} modelConfig={configs[3]} position={positions[3]} rotations={rotations[3]}>
          <Model loader={loader} modelConfig={configs[4]} position={positions[4]} rotations={rotations[4]}/>
        </Model>
      </Model>
      <Html
        style={{
          width: 200,
          height: 200
        }}
      >
        <span>
          HEELLLEOOOOP
        </span>
      </Html>
      <Model loader={loader} modelConfig={configs[5]} position={positions[5]} rotations={rotations[5]}/>
      <Model loader={loader} modelConfig={configs[6]} position={positions[6]} rotations={rotations[6]}>
        <Model loader={loader} modelConfig={configs[7]} position={positions[7]} rotations={rotations[7]}>
          <Model loader={loader} modelConfig={configs[8]} position={positions[8]} rotations={rotations[8]}/>
        </Model>
      </Model>

    </Model>
  )
}