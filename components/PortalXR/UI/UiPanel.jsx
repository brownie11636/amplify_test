import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
// import ThreeMeshUI from 'three-, mesh-ui'
// import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui'
import ThreeMeshUI from '../three-mesh-ui/three-mesh-ui'
import * as THREE from 'three'

import { useXRStore } from "../../../store/zustand/XR.js"

extend(ThreeMeshUI);

// const defaultColor = new THREE.Color(0xffffff);    //white
const defaultColor = new THREE.Color(0x9d78ae);   //purple
const buttonColor = new THREE.Color(0x664455)
const selectedColor = new THREE.Color(0xe36dc2);

export default function UiPanel(props){
  const triggerPressed_R = useRef({now:false, prev:false})
  const controlMode = useRef(useXRStore.getState().controllerMode)
  const panelRef = useRef();
  const modeBlockRef = useRef();
  const contentBlockRef = useRef();
  const prevRef = useRef();
  const textRef = useRef();
  const modeRef = useRef();
  const defaultButtonRef = useRef();
  const operatingButtonRef = useRef();
  const settingButtonRef = useRef();

  const camera = useThree((state) => state.camera)

  useEffect(() => {
    console.log("mounted!!!!!!!!")
    const unsubXRStore = useXRStore.subscribe(
      (state,prevState) => {
        modeRef.current.set({content:"MODE:\n"+ state.controllerMode})
        controlMode.current = state.controllerMode; 
        // setGamepadCallback(triggerPressed_R,state.triggerPressed_R,()=>console.log("pressed"), ()=>console.log("released"))
        console.log(state)
        console.log(prevState)
    })

    panelRef.current.lookAt(0,0,0);
    console.log(panelRef.current)
    defaultButtonRef.current.layers.set(4);

    return () => {
      console.log("unmounted")
      unsubXRStore()
    }
  },[])  
  
  useEffect(() => {
    console.log("camera")
    console.log(camera)
  },[camera])

  useFrame(() => {
    modeRef.current.set({content:"MODE:\n"+ controlMode.current});
    // prevRef.current.set({content:triggerPressed_R.current.prev +"\n"})
    // textRef.current.set({content:triggerPressed_R.current.now+"\n"});
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
      ref={panelRef}
      args={[{
        width: 4,
        height: 1.9,
        fontSize: 0.2,
        // backgroundOpacity: 0.5,
        backgroundColor: defaultColor,
        fontFamily: '/fonts/Roboto-msdf.json',
        fontTexture: '/fonts/Roboto-msdf.png',
        contentDirection: "row",
        alignItems: "start",
        // justifyContent: "start",
        // justifycontent: "space-evenly",
        borderRadius: 0.1,

        // padding: 0.075,
      }]}
      {...props}
      // onUpdate={self=>self.lookAt(0,0,0)}
    >
      {/* <axesHelper args={[1]}/> */}
      <block ref={modeBlockRef} 
        args={[{width:1.5, height:1.9,backgroundOpacity:0.2,}]} 
      >
        {/* <axesHelper args={[1]} /> */}
        <block args={[{width:1.5, height:0.45,backgroundOpacity:0,margin:0.1, interLine: 0.05,}]}>
          <text ref={modeRef} 
            // content={ "MODE:\n"+controlMode.current } 
          />
        </block>
        <block args={[{backgroundOpacity:0}]}>
          <ModeButton ref={defaultButtonRef} content={"default"} />
          <ModeButton ref={operatingButtonRef} content={"operating"} />
          <ModeButton ref={settingButtonRef} content={"setting"}/>
        </block>
      </block>
      <block ref={contentBlockRef}
        args={[{width:2.5, height:1.9,backgroundOpacity:0,borderOpacity:1,borderWidth:0.02,borderColor:new THREE.Color(0x000000)}]} 
      >
        {}
      </block>
    </block>
  )
}

const ModeButton = forwardRef(function ModeButton({mode, content, onClick, ...props}, button) {
  // const button = _button;
  // const button = useRef();

  const controlMode = useRef(useXRStore.getState().controllerMode); 
  const switchMode = useXRStore.getState().switchMode;

  useEffect(()=>{
    console.log(button)
    button.current.setupState({
      state: "default",
      attributes: {
        backgroundColor: buttonColor,
        backgroundOpacity: 1,
      }
    })
    button.current.setupState({
      state: "hovered",
      attributes: {        
        backgroundColor: buttonColor,
        backgroundOpacity: 0.7,
      }
    })
    button.current.setupState({
      state: "selected",
      attributes: {
        backgroundColor: selectedColor,
        backgroundOpacity: 1,
      }
    })

    button.current.setState("default")
    console.log(button.current)
    console.log(button.current.childrenUIs)
    console.log(button.current.currentState)
  },[]);

  useEffect(()=>{
    console.log(content+" button rendered")
    console.log(button.current)
  });

  useFrame(()=>{
    ThreeMeshUI.update()

  })

  return (
    <block
      ref={button}
      onPointerEnter={() => button.current.setState("hovered")}
      onPointerLeave={() => button.current.setState("default")}
      onPointerDown={() => button.current.setState("selected")}
      onPointerUp={(e) => {
        e.stopPropagation()
        button.current.setState("hovered")
        console.log("swithMode button clicked")
        // onClick()
        switchMode(content);
      }}
      args={[{
        width: 1.2,
        height: 0.3,
        fontSize: 0.2,
        margin:0.05,
        // backgroundOpacity: 0.5,
        backgroundColor: buttonColor,
        // fontFamily: '/fonts/Roboto-msdf.json',
        // fontTexture: '/fonts/Roboto-msdf.png',
        justfycontent: "center",
        // borderRadius: 0.1,
        padding: 0.05,
        
      }]}
      {...props}
      >
      <text content={content}/>
    </block>
  );
})

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