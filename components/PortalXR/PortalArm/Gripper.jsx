import _ from "lodash"
import * as THREE from 'three'
import { forwardRef, useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useModeStore } from "../../../store/zustand/mode.js"
import { useControlStore } from "../../../store/zustand/control.js"
import { useXRGamepadStore } from "../../../store/zustand/XRGamepad.js"

import Model from "../components/Model"

// import Box from './boxes'
const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;

const gripperGeometries = [
  [0, 0, -0.0533],
  [0.01861, 0, -0.04739],
  [0.008, 0, -0.058],
  [0, 0, -0.05694],
  [0, 0, 0],
];

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
  
  const squeezePressed_R = useRef(useXRGamepadStore.getState().squeezePressed_R)
  const stickUp_R = useRef(useXRGamepadStore.getState().stickUp_R)
  const stickDown_R = useRef(useXRGamepadStore.getState().stickDown_R) 
  const increaseGripDistance = useControlStore((state)=>state.increaseGripDistance);

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
      (distance)=>grip(distance, ref.current)
    );
    
    const unsubXRGamepadStore = useXRGamepadStore.subscribe((state) => {
      squeezePressed_R.current = state.squeezePressed_R
      stickUp_R.current = state.stickUp_R;
      stickDown_R.current = state.stickDown_R;
    })
      
    return () => {
      unsubGrip();
      unsubXRGamepadStore();
    }
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
        <group 
          ref={el=>(ref.current[9]=el)} //for control rotation offset
          rotation={[-0.5*Math.PI, 0, 0]} 
        />
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

export default Gripper;