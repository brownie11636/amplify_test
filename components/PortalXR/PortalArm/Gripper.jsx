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

const gripperPositions = setGripperPositions();

const Gripper = forwardRef(function Gripper({loader, geoConfig, children,...props},ref) {
  
  const gripperConfigs = setGripperConfigs("KARI");
  // const ref = useRef([]);
  const guideRef = useRef();

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
    
    // grip(50, ref.current);
    let ratio = useControlStore.getState().gripRatio;
    grip.byRatio(ratio, ref.current)
    useControlStore.setState({gripDistance: grip.ratioToDistance(ratio)})
    // grip.byAngle(0, ref.current)
    // grip.byDistance(0.01, ref.current)
    // grip.byRatio(0, ref.current)
    const unsubGripDistance = useControlStore.subscribe(
      (state)=>state.gripDistance,
      (distance)=>{
        grip.byDistance(distance, ref.current);
        useControlStore.setState({gripRatio: grip.distanceToRatio(distance)})
      }
    );
    
    // const unsubGripRatio = useControlStore.subscribe(
    //   (state)=>state.gripRatio,
    //   (ratio)=>{
    //     grip.byRatio(ratio, ref.current);
        
    //   }
    // );

    ref.current[0].name = "gripper_BASE"
    // guideRef.current.position.set(new THREE.Vector3(0, 0, -0.1317))
    
    return () => {
      unsubGripDistance();
      // unsubGripRatio();
    }
  },[])

  useEffect(() => console.log("gripper is rendered"),)

  let pos4 = new THREE.Vector3();
  let pos8 = new THREE.Vector3();
  let offset = new THREE.Vector3(0, 0, -0.03);

  useFrame((state,delta,XRFrame)=>{
    
    // guideRef.current.position.addVectors(
    //   ref.current[0].worldToLocal(ref.current[4].getWorldPosition(pos4)),
    //   ref.current[0].worldToLocal(ref.current[8].getWorldPosition(pos8))
    // ).multiplyScalar(0.5).add(offset);

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
        <axesHelper ref={guideRef} args={[1]} 
        position={[0, 0, -0.1417]} //노즐 잡았을때 예상 
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

function setGripperConfigs(type) {
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
        if (k === 1 || (type === "KARI" && k === 4)) {
          configs_[i].path = `/3d_models/portalarm/UR5e_ver/ALLZERO/RH-P12-RN/GLTFs/${k}-${j}.gltf`;
        } else {
          configs_[i].path = `/3d_models/portalarm/UR5e_ver/ALLZERO/RH-P12-RN/GLTFs/${k}.gltf`;
        }
      }
    }  
    return configs_
}

const grip = {

  maxAngle: 59.277210,  //degree
  minAngle: -4.024064,  //degree    

  byAngle: (angleRad, gripperLinks, type = "ROBOTIS_RH-P12-RN") => {
    if ( type === "ROBOTIS_RH-P12-RN" ){
      if ( angleRad * RAD2DEG < grip.minAngle || angleRad * RAD2DEG > grip.maxAngle) {
      // if ( distance < 1 || distance > 105) {
        console.error("gripper: out of range, ", angleRad * RAD2DEG, " degree");
        return;
      } else {
        console.log("gripAngle:", angleRad * RAD2DEG)
        //angleDeg === -4 closed angleDeg === 60 open
        for (let i = 1; i < 8; i++ ){
          let j = Math.floor((i - 1)/4);
          let k = 1 + (i - 1)% 4
          let rot = 2 * (j - 0.5) * angleRad; 
          if ( k < 3) gripperLinks[i].rotation.y = rot; 
          else if (k === 3) gripperLinks[i].rotation.y = angleRad;
        } 
      } 
    } else {
      console.error("not registed gripper");
      return;
    }
  },

  /**
   * control gripper by distance between gripper's finger 
   * (without end tip, even the default rubber base) 
   * (unit: m)
   * (ROBOTIS_RH-P12-RN: max = 0.116, min = 0.002)
   */
  byDistance: (distance, gripperLinks, type = "ROBOTIS_RH-P12-RN") => {
    grip.byAngle(grip.distanceToAngle(distance), gripperLinks, type);
  },  

  /**
   * control gripper by custom ratio 
   * (ROBOTIS_RH-P12-RN: max = 740, min = 0, linear to angle)
   */
  byRatio: (ratio, gripperLinks, type = "ROBOTIS_RH-P12-RN") => {
    grip.byAngle(grip.ratioToAngle(ratio), gripperLinks, type);
  },

  ratioToDistance: (ratio) => {
    return grip.angleToDistance(grip.ratioToAngle(ratio));
  },

  distanceToRatio: (distance) => {
    return grip.angleToRatio(grip.distanceToAngle(distance));
  },

  angleToDistance: (angleRad) => {
    return 2 * (0.008 + 0.001 + 0.057 * Math.sin(angleRad));
  },

  distanceToAngle: (distance) => {
    return Math.asin((( distance / 2 ) - 0.008 - 0.001) / 0.057 );
  },

  angleToRatio: (angleRad) => {
    return (grip.maxAngle - angleRad * RAD2DEG) * 740 / (grip.maxAngle - grip.minAngle);
  },

  ratioToAngle: (ratio) => {
    console.log(( grip.maxAngle - ratio * (grip.maxAngle - grip.minAngle) / 740 ))
    return ( grip.maxAngle - ratio * (grip.maxAngle - grip.minAngle) / 740 ) * DEG2RAD;
  }
}


export default Gripper;
// export { grip };