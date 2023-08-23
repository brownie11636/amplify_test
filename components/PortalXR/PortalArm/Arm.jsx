import _ from "lodash"
import * as THREE from 'three'
import { forwardRef, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControlStore } from "../../../store/zustand/control.js"

import Model from "../components/Model"

// const DEG2RAD = THREE.MathUtils.DEG2RAD;
// const RAD2DEG = THREE.MathUtils.RAD2DEG;

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
  const vrLog = useControlStore.getState().updateNewLog;

  useEffect(() => {
    // console.log(useControlStore.subscribe)
    const unsubAngles = useControlStore.subscribe(
      (state)=>state.actualAngles_q,
      (angles)=>{
        // console.log(state)
        // vrLog(toString(angles))
      for (let i=0; i<6; i++){
        forwardedRef.current[i + 1].rotation.fromArray(rotAxes[i].map((val) => val * angles[i]))
      }
    })
    console.log("arm index:",index)
    console.log("poses",props.positions)

    forwardedRef.current[0].name = "robot_BASE";

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
      <Model ref={el => (forwardedRef.current[0] = el)} loader={loader} modelConfig={ArmConfigs[0]}>
        <Model ref={el => (forwardedRef.current[1] = el)} loader={loader} modelConfig={ArmConfigs[1]} position={positions[0]} >
          <Model ref={el => (forwardedRef.current[2] = el)} loader={loader} modelConfig={ArmConfigs[2]} position={positions[1]} >
            <Model ref={el => (forwardedRef.current[3] = el)} loader={loader} modelConfig={ArmConfigs[3]} position={positions[2]} >
              <Model ref={el => (forwardedRef.current[4] = el)} loader={loader} modelConfig={ArmConfigs[4]} position={positions[3]} >
                <Model ref={el => (forwardedRef.current[5] = el)} loader={loader} modelConfig={ArmConfigs[5]} position={positions[4]} >
                  <Model ref={el => (forwardedRef.current[6] = el)} loader={loader} modelConfig={ArmConfigs[6]} position={positions[5]} >
                    {children}
                  </Model>
                </Model>
              </Model>
            </Model>
          </Model>
        </Model>
      </Model>
  )
})

export default Arm;
