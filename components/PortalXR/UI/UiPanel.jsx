import React, { useState, useEffect, useRef, forwardRef, useLayoutEffect } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Box } from '@react-three/drei'
// import ThreeMeshUI from 'three-, mesh-ui'
// import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui'
// import ThreeMeshUI from '../three-mesh-ui/three-mesh-ui'
import ThreeMeshUI from '../three-mesh-ui-7.1.5/src/three-mesh-ui'
import * as THREE from 'three'
import { Interactive, useInteraction } from '@react-three/xr'

import { useModeStore } from "/store/zustand/mode.js"
import * as color from "./colors.js"
import * as UiStates from "./UiStates"
import LayeredBlock from "./components/LayeredBlock"
import Button from "./components/Button"
import OperatingBlock from './OperatingBlock'

extend(ThreeMeshUI);

/**
 * TODO:
 *  THREE.3dObject.traverse 사용해서 three-mesh-ui frame, text 검사 해서 layer 변경
 *  StatBoard 만들기 (FPS 확인용)
 */


export default function UiPanel(props){
  const panelRef = useRef();

  useEffect(() => {
    console.log("mounted!!!!!!!!")

    const robotoFontFamily = ThreeMeshUI.FontLibrary.addFontFamily( "Roboto" );
    robotoFontFamily.addVariant("normal","normal","/fonts/Roboto-msdf.json","/fonts/Roboto-msdf.png")

    panelRef.current.lookAt(0,0,0);

    console.log(panelRef.current)

    return () => {
      console.log("unmounted")
    }
  },[])  

  useFrame(() => {
    ThreeMeshUI.update()
    // console.log(panelRef.current)
  })
  
  useEffect(()=>{
    console.log("UiPanel is rendered")
  })

  const args = {
    width:"100%",
    height:"100%",
    backgroundColor:color.portalPurple,
    // backgroundOpacity:1,
    flexDirection:"row",
    borderRadius:0.1,
    borderColor:color.black,
    padding:0.01,
    margin:0.01,
    borderWidth:0.01,
  }

  return (
    <block
      ref={panelRef}
      args={[{
        ...args,
        width: 4.5,
        height: 4,
        fontSize: 0.2,
        // backgroundOpacity: 0.5,
        // backgroundColor: color.portalPurple,
        fontFamily: 'Roboto',
        // fontFamily: '/fonts/Roboto-msdf.json',
        // fontTexture: '/fonts/Roboto-msdf.png',
        flexDirection: "column",
        // alignItems: "start",
        // justifyContent: "center",
        // justifyContent: "space-evenly",
        // borderRadius: 0.1,

        // padding: 0.075,
      }]}
      {...props}
      // onUpdate={self=>self.lookAt(0,0,0)}
    >
      {/* <axesHelper args={[1]}/> */}
      <block args={[{...args, height:"50%", borderWidth:0.02,}]} >
        <ModePanel args={[{...args, width:"30%", flexDirection:"column"}]} />
        <block args={[{...args, width:"70%", flexDirection:"column"}]} >
          <OperatingBlock args={[{...args,flexDirection:"column"}]} />
        </block>
      </block>
      <block args={[{ 
        ...args,
        width:"100%", 
        height:"50%",
        borderWidth:0.02,
      }]} >
        {/* <text 
          // args={[{textContent:"dasfasd"}]}
          _textContent-value={"status block?\n"}
        /> */}
        {/* <text 
          args={[{textContent:"dasfasd"}]}
          // _textContent-value={"status block?\n"}
        /> */}
        
        {/* <text content={"XR Zoom?"}/> */}
      </block>
    </block>
  )
}

const ModePanel = (props) =>{
  const modeTextRef = useRef();
  const defaultRef = useRef(); 
  const operatingRef = useRef(); 
  const settingRef = useRef(); 
  const buttonRefs = [defaultRef,operatingRef,settingRef];
  const switchMode = useModeStore.getState().switchMode;


  useEffect(() => {
    console.log("mounted!!!!!!!!")
    // console.log(color.black)
    const unsubModeStore = useModeStore.subscribe(
      (state,prevState) => {
        /////////////////////////////////////////////
        // modeTextRef.current.set({content:"MODE:\n"})// 
        //////////////////////////////////////////// 
        // modeTextRef.current.set({content:"MODE:\n"+ state.controllerMode})
        // console.log(state.controllerMode)

        for ( let i = 0 ; i < 3 ; i++){
          let text
          buttonRefs[i].current.traverse((obj)=>{
            // console.log(obj)
            if (obj.isText) {
              // console.log(obj.content)
              text = obj._textContent._value
            }
          })
          // console.log(buttonRefs[i].current)
          buttonRefs[i].current.isActive = (text === state.controllerMode)
          if (!buttonRefs[i].current.isActive) buttonRefs[i].current.setState("idle")
        }
      }
    )

    buttonRefs[0].current.isActive = true;
    buttonRefs[0].current.setState("active")


    return () => {
      console.log("unmounted")
      unsubModeStore()
    }
  },[])  

  useFrame(() => {
    // modeRef.current.set({content:"MODE:\n"+ controlMode.current});
    // prevRef.current.set({content:triggerPressed_R.current.prev +"\n"})
    // textRef.current.set({content:triggerPressed_R.current.now+"\n"});
    // textRef.current.content = triggerPressed_R.current+"\n";
  })
  
    const args = {
      width:"100%",
      height:"100%",
      backgroundColor:color.portalPurple,
      // backgroundOpacity:1,
      flexDirection:"column",
      borderRadius:0.1,
      borderColor:color.black,
      borderWidth:0.02,
      padding:0.02,
      margin:0.02,
      justiyContent:"center",
      alignItems:"center",
    }

  const modeButtonArgs = {
    ...args,
    width: "100%",
    height: "33%",
    // height: 0.3,
    backgroundColor: color.darkPurple,
    // alignItems:"stretch",
    margin:[0.05, 0.02, 0.05, 0.02]
  }

  return (
    <block args={props.args}
    // args={[{...args, width:"30%",}]} 
    >
      <block args={[{...args, height:"25%",backgroundOpacity:0, lineHeight: 0.05,}]}>
        {/* <text ref={modeTextRef} content={ "MODE:\ndefault" } /> */}
        <text ref={modeTextRef} args={[{height:"100%", alignItems:"center", textAlign:"center"}]} _textContent-value={ "MODE:" } />
      </block>
      <block args={[{...args, width:"100%",height:"75%",alignItems:"stretch",
        // backgroundOpacity:0
      }]}>
        <Button ref={defaultRef} onClick={()=>{switchMode("default")}} args={[modeButtonArgs]} stateAttribute={UiStates.button} textContent={"default"} />
        <Button ref={operatingRef} onClick={()=>{switchMode("operating")}} args={[modeButtonArgs]} stateAttribute={UiStates.button} textContent={"operating"} />
        <Button ref={settingRef} onClick={()=>{switchMode("setting")}} args={[modeButtonArgs]} stateAttribute={UiStates.button} textContent={"setting"}/>
      </block>
    </block>
  )
}


