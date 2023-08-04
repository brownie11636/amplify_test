import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Box } from '@react-three/drei'
// import ThreeMeshUI from 'three-, mesh-ui'
// import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui'
// import ThreeMeshUI from '../three-mesh-ui/three-mesh-ui'
import ThreeMeshUI, { FontLibrary } from '../three-mesh-ui-7.1.5/src/three-mesh-ui'
import * as THREE from 'three'
import { Interactive, useInteraction } from '@react-three/xr'

import { useModeStore } from "../../../store/zustand/mode.js"

extend(ThreeMeshUI);

/**
 * TODO:
 *  최근 10초내의 최대 최소값 표현 mrdoob/stats.js 처럼
 */

// const defaultColor = new THREE.Color(0xffffff);    //white
const defaultColor = new THREE.Color(0x9d78ae);   //purple
const buttonColor = new THREE.Color(0x664455)
const selectedColor = new THREE.Color(0xe36dc2);

export default function StatPanel(props){
  const panelRef = useRef();
  const fpsRef = useRef();
  const modeTextRef = useRef();

  
  let fps;
  let acculTime = 0;
  const interval = 0.2
  useEffect(() => {
    
    // const robotoFontFamily = ThreeMeshUI.FontLibrary.addFontFamily( "Roboto" );
    // robotoFontFamily.addVariant("normal","normal","/fonts/Roboto-msdf.json","/fonts/Roboto-msdf.png")
    
    panelRef.current.lookAt(0,0,0);

    return () => {}
  },[])  

  useFrame((state, delta, xrFrame) => {
    acculTime += delta;
    // console.log(acculTime)
    if (acculTime > interval){
      acculTime = 0;
      fps = Math.floor(1 / delta);
      // fpsRef.current.set({content:"FPS: " + fps
      fpsRef.current.set({textContent:"FPS: " + fps
                              + "\n MS: " + Math.floor(delta*1000)})
      // ThreeMeshUI.update()
    }
    // ThreeMeshUI.update()

  })
  
  useEffect(()=>{
    console.log("UiPanel is rendered")
  })

  return (
    <block
      ref={panelRef}
      args={[{
        width: 1,
        height: 0.8,
        fontSize: 0.2,
        // backgroundOpacity: 0.5,
        backgroundColor: defaultColor,
        // fontFamily: robotoFontFamily,
        fontFamily: "Roboto",
        // fontFamily: '/fonts/Roboto-msdf.json',
        // fontTexture: '/fonts/Roboto-msdf.png',
        flexDirection: "column",
        // alignItems: "start",
        // justifyContent: "center",
        // justifyContent: "space-evenly",
        borderRadius: 0.1,

        padding: 0.075,
      }]}
      {...props}
      // onUpdate={self=>self.lookAt(0,0,0)}
    >
      <text ref={fpsRef}/>
      {/* <axesHelper args={[1]}/> */}
      {/* <block args={[{height:2,backgroundOpacity:0,flexDirection:"row",borderRadius:0.1,}]}>
       
      </block> */}
    </block>
  )
}