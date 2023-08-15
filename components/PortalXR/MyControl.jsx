import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, useLayoutEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Line, Sphere, shaderMaterial } from '@react-three/drei'
import { useXR, useController } from '@react-three/xr'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { textureLoader } from "three/examples/jsm/loaders/DRACOLoader";
import _ from "lodash"

import { PortalCommContext } from '../../utils/contexts/portalComm';
import { PortalRTCContext, RgbdContext } from './XR.container';
import { GamepadContext } from "./GamepadContext"
import { useXRGamepadStore } from "../../store/zustand/XRGamepad.js"
import { useControlStore } from "../../store/zustand/control.js"
import { useModeStore } from "../../store/zustand/mode.js"

const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;

//Euler {isEuler: true, _x: -0.0010090750180074188, _y: 0.02912233438379935, _z: 0.0043550970184092, _order: 'XYZ'}

export default function MyControl({ ...props}) {
  
  const rightController = useController('right');

  const stickUp_R = useRef(useXRGamepadStore.getState().stickUp_R)
  const stickDown_R = useRef(useXRGamepadStore.getState().stickDown_R)

  const controllerMode = useRef(useModeStore.getState().controllerMode);
  const settingMode = useRef(useModeStore.getState().spatialVideoSettingMode);

  const vrLog = useControlStore.getState().updateNewLog;
  
  useEffect(()=>{
    
    const unsubModeStore = useModeStore.subscribe(
      (_) => {
        controllerMode.current = _.controllerMode;
        settingMode.current = _.settingMode;
        // _.spatialVideoSettingMode.
        console.log("asdfasd")
      }
    )

    const unsubXRGamepadStore = useXRGamepadStore.subscribe((_) => {
      stickUp_R.current = _.stickUp_R;
      stickDown_R.current = _.stickDown_R;
    })
    return () => {
      unsubModeStore();
      unsubXRGamepadStore();
    }
  },[])
  
  let weight;

  useFrame((state, delta, XRFrame)=>{
    if (XRFrame && rightController){

      // 이부분을 XR gamepadstore 부분에?
      if(controllerMode.current === "default"){

      }
      if(controllerMode.current === "operating"){

      }
      if(controllerMode.current === "setting"){
        let mode = settingMode.current;
        // vrLog("setting");
        // console.log("setting");

        if(mode.type!==null 
          &&(mode.type === "position" 
          || mode.type === "rotation")){
          // vrLog("position rotation")
          if(stickUp_R.current || stickDown_R.current) {
            let setJSON = {} 
            setJSON[mode.target] = _.cloneDeep(useControlStore.getState()[mode.target]);
            
            if (mode.type === "position") {
              setJSON[mode.target][mode.type][mode.index] += delta * 0.05 * (stickUp_R.current? 1 : -1)
            } else {
              setJSON[mode.target][mode.type][mode.index] += delta * 0.05 * (stickUp_R.current? 1 : -1)
            }
            useControlStore.setState(setJSON)
          }
        } else if (mode.type === "scale"){
          if(stickUp_R.current || stickDown_R.current) {
            let setJSON = {} 
            setJSON[mode.target] = _.cloneDeep(useControlStore.getState()[mode.target]);
            setJSON[mode.target][mode.type][mode.index] += delta * 0.001 * (stickUp_R.current? 1 : -1)
            useControlStore.setState({...setJSON})
          }
        }
        
      }
    }
  })




  return (
    <group>
    </group>
  )
}
