import _ from "lodash"
import React, { useState, useEffect, useRef, forwardRef, useLayoutEffect } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import ThreeMeshUI from './three-mesh-ui-7.1.5/src/three-mesh-ui'

import { useModeStore } from "/store/zustand/mode.js"
import * as color from "./colors.js"
import * as UiStates from "./UiStates"
import Button from "./components/Button"
import OperatingBlock from './OperatingBlock'
import { useControlStore } from "/store/zustand/control.js"


/**
 * TODO:
 *  THREE.3dObject.traverse 사용해서 three-mesh-ui frame, text 검사 해서 layer 변경
 *  StatBoard 만들기 (FPS 확인용)
 */


export default function ConsoleBoard({numLines, ...props}){
  const boardRef = useRef();
  const textRef = useRef();
  let textContent = ""
  let lineCount = 1;
  let logCount = 0

  useEffect(() => {
    console.log("mounted!!!!!!!!")

    boardRef.current.lookAt(0,1,0);
    useControlStore.setState({consoleNumLines: numLines})

    const unsubNewLog = useControlStore.subscribe(
      (state) => state.newLog,
      log => {
        console.log(lineCount)
        console.log(numLines)
        if (lineCount > numLines){
          console.log(textContent.indexOf("\n"))
          textContent = textContent.slice(textContent.indexOf("\n")+1)
        }
        textContent = textContent+"\n"+"log."+logCount+": "+log;
        console.log(textContent)
        textRef.current.set({textContent: textContent})
        lineCount++
        logCount++
      }
    )

    return () => {
      console.log("unmounted");
      unsubNewLog()
    }
  },[])  

  useFrame(() => {
    // console.log(boardRef.current)
    // textRef.current.set({textContent: textContent})

  })
  
  useEffect(()=>{
    console.log("ConsoleBoard is rendered")
  })

  // const args = {
  //   width:"100%",
  //   height:"100%",
  //   backgroundColor:color.portalPurple,
  //   // backgroundOpacity:1,
  //   flexDirection:"column",
  //   borderRadius:0.05,
  //   borderColor:color.black,
  //   padding:0.1,
  //   margin:0.01,
  //   borderWidth:0.01,
  // }
  let height = numLines*0.12;
  return (
    <block
      ref={boardRef}
      args={[{
        width: 2.5,
        // height: height,
        // height: numLines * 0.12,
        height: 1.3,
        backgroundColor:color.portalPurple,
        flexDirection:"column",
        fontSize: 0.1,
        lineHeight: 1.1,
        fontFamily: 'Roboto',
        padding:0.1
      }]}
      {...props}
      // onUpdate={self=>self.lookAt(0,0,0)}
    >
    {/* // <block
    //   ref={boardRef}
    //   args={[{
    //     width: 3,
    //     height: 0.8,
    //     fontSize: 0.1,
    //     // backgroundOpacity: 0.5,
    //     backgroundColor: color.portalPurple,
    //     // fontFamily: robotoFontFamily,
    //     fontFamily: "Roboto",
    //     // fontFamily: '/fonts/Roboto-msdf.json',
    //     // fontTexture: '/fonts/Roboto-msdf.png',
    //     flexDirection: "column",
    //     // alignItems: "start",
    //     // justifyContent: "center",
    //     // justifyContent: "space-evenly",
    //     borderRadius: 0.1,

    //     padding: 0.075,
    //   }]}
    //   {...props}
    //   // onUpdate={self=>self.lookAt(0,0,0)}
    // > */}
      <text 
        ref={textRef} 
        args={[{
          // width:"100%", height:"100%",
        justifyContent:"end",
        flexDirection:"column-reverse"
        // alignItems:"center"
      }]} 
        // _textContent-value={"XR Zoom?\nXR Zoom?\nXR Zoom?\n"}
      />
    </block>
  )
}
