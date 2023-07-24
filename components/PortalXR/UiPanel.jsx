import React, { useState, useEffect, useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
// import ThreeMeshUI from 'three-mesh-ui'
// import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui'
import ThreeMeshUI from './three-mesh-ui/three-mesh-ui'
import * as THREE from 'three'

import { useXRStore } from "../../store/zustand/XR.js"

extend(ThreeMeshUI);

export default function UiPanel({...props}){
  const triggerPressed_R = useRef({now:false, prev:false})
  const controlMode = useRef(useXRStore.getState().controllerMode)

  const prevRef = useRef();
  const textRef = useRef();
  const modeRef = useRef();

  useEffect(() => {
    const unsubXRStore = useXRStore.subscribe(
      (state) => {
        controlMode.current = state.controllerMode; 
        setGamepadCallback(triggerPressed_R,state.triggerPressed_R,()=> console.log("pressed"), () => console.log("released"))
        // console.log(state.controllerMode)
    })
    return unsubXRStore
  },[])  
  
  useFrame(() => {
    modeRef.current.set({content:controlMode.current +"\n"});
    prevRef.current.set({content:triggerPressed_R.current.prev +"\n"})
    textRef.current.set({content:triggerPressed_R.current.now+"\n"});
    // textRef.current.content = triggerPressed_R.current+"\n";
    ThreeMeshUI.update()
    // console.log(triggerPressed_R.current)
  })
  
  const [accentColor] = useState(() => new THREE.Color('white'))

  useEffect(()=>{
    console.log("UiPanel is rendered")
  })

  return (
    <block
      args={[
        {
          width: 1,
          height: 0.5,
          fontSize: 0.1,
          // backgroundOpacity: 0.5,
          fontFamily: '/fonts/Roboto-msdf.json',
          fontTexture: '/fonts/Roboto-msdf.png',
          justfycontent: "center"
        }
    ]}>
      <text ref={modeRef} content = { controlMode.current + "\n" } />
      <text content = { "adsf\n" } />
      <text content={"trigger_R pressed? \n"} 
        // args={[{fontColor: accentColor}]} 
      />
      <text ref={prevRef} content = { `${triggerPressed_R.current.prev}\n` } />
      <text ref={textRef} content = { triggerPressed_R.current.now+`\n` } />
      {/* <text content={"hello"} /> */}
    </block>
  )
}

const setGamepadCallback = (padRef, padState, pressCallback, releaseCallback) => {
  if (padRef.hasOwnProperty("current")){
    padRef.current.prev = padRef.current.now;
    padRef.current.now = padState;
    // console.log("asdf")
    if (padRef.current.now !== padRef.current.prev){
      if (padRef.current.now === true) pressCallback()
      else if (padRef.current.now === false) releaseCallback()
    }
  }
}