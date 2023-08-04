import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from "three"

import * as color from "./colors.js"
import * as UiStates from "./UiStates"
import LayeredBlock from "./components/LayeredBlock"
import Button from "./components/Button"
import { useModeStore } from "/store/zustand/mode.js"
import { update } from '../three-mesh-ui/three-mesh-ui.js'


export default function OperatingBlock(props) {
  // const ref = useRef();
  // const testRef = useRef();
  useEffect(()=>{
  
    return () => {

    }
  },[])

  const args = {
    width: "100%",
    height: "100%",
    backgroundColor: color.portalPurple,
    // backgroundOpacity: 1,
    flexDirection: "row",
    borderRadius: 0.1,
    borderColor: color.black,
    padding: 0.01,
    margin: 0.01,
    borderWidth: 0.01,
  }

  const buttonArgs = { 
    ...args,
    width: 0.4, 
    height: 0.4, 
    margin: 0.04, 
    justifyContent: "center",
    borderColor: color.black,
  }
  return (
    <LayeredBlock layer={"operating"}
      args={props.args}
      // args={[{width:3, height:2, backgroundOpacity:1, borderOpacity:1, borderWidth:0.02, borderColor: color.black}]} 
      // args={[{width:2.5, height:2, backgroundOpacity:0,borderOpacity:1,borderWidth:0.02,borderColor:new THREE.Color(0x000000)}]}
    >
      <block args={[{...args,width:2.8, height:0.6, flexDirection: "row", alignItems:"center", justifyContent:"center"}]}>
        <block args={[{...args,width:1, height:0.5, margin:0.04, justifyContent:"center"}]}>
          {/* <text _textContent-value={"fix\naxis"}/> */}
          <text _textContent-value={"translating\naxis"}/>
        </block>
        <FixAxisButton axisStr={"X"} type={"translating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <FixAxisButton axisStr={"Y"} type={"translating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <FixAxisButton axisStr={"Z"} type={"translating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        {/* <FixTranslateButton args={[buttonArgs]} stateAttribute={UiStates.button} translateAxesStr={"X"} />
        <FixTranslateButton args={[buttonArgs]} stateAttribute={UiStates.button} translateAxesStr={"Y"} />
        <FixTranslateButton args={[buttonArgs]} stateAttribute={UiStates.button} translateAxesStr={"Z"} />
        <FixTranslateButton args={[{...buttonArgs,width:0.6}]} stateAttribute={UiStates.button} translateAxesStr={"XYZ"} /> */}
      </block>
      <block args={[{...args,width:2.8, height:0.6, flexDirection: "row", alignItems:"center", justifyContent:"center"}]}>
        <block args={[{...args,width:1, height:0.5, margin:0.04, justifyContent:"center"}]}>
          <text _textContent-value={"rotating\naxes"}/>
        </block>       
        <FixAxisButton axisStr={"X"} type={"rotating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <FixAxisButton axisStr={"Y"} type={"rotating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <FixAxisButton axisStr={"Z"} type={"rotating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        {/* <FixRotateButton args={[buttonArgs]} stateAttribute={UiStates.button} axisStr={"X"} />
        <FixRotateButton args={[buttonArgs]} stateAttribute={UiStates.button} axisStr={"Y"} />
        <FixRotateButton args={[buttonArgs]} stateAttribute={UiStates.button} axisStr={"Z"} /> */}
      </block>

      {/* <block args={[{width:3, height:0.6, flexDirection: "row", alignItems:"center", justifyContent:"start"}]}>
        <block args={[{width:0.7, height:0.5, margin:0.05, justifyContent:"center"}]}>
          <text _textContent-value={"fix\nplane"}/>
        </block>
        <FixTranslateButton args={[{...buttonArgs, width:0.55}]} stateAttribute={UiStates.button} translateAxesStr={"XY"} />
        <FixTranslateButton args={[{...buttonArgs, width:0.55}]} stateAttribute={UiStates.button} translateAxesStr={"YZ"} />
        <FixTranslateButton args={[{...buttonArgs, width:0.55}]} stateAttribute={UiStates.button} translateAxesStr={"ZX"} />
      </block> */}
      {/* <block args={[{width:"auto", height:"auto"}]}> 
        <text _textContent-value={"setting - how to operate\n"}/>
      </block> */}
    </LayeredBlock>
  )
}

function FixTranslateButton( {translateAxesStr, ...props}){
  const buttonRef = useRef();
  const updateTranslateAxes = useModeStore.getState()["updateTranslateAxes"];
  // const geo = translateAxesStr==="FREE" ? null : translateAxesStr;
  const axesRef = useRef();
  const q = new THREE.Quaternion;
  const dummy = new THREE.Object3D;
  // const axisGeo = {length:0.2, width:0.01}
  const xRef = useRef();
  const yRef = useRef();
  const zRef = useRef();

  useEffect(() => {
    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        // console.log(state.translateAxes)
        // console.log(translateAxesStr)
        // console.log(translateAxesStr === state.translateAxes)
        if(translateAxesStr === state.translateAxes){
          // console.log("adsf")
          // buttonRef.current.setState(active);
          buttonRef.current.isActive = true;
        }else {
          buttonRef.current.isActive = false;
          buttonRef.current.setState("idle")
        }
      }
    )

    if (translateAxesStr === "XYZ" ){
      buttonRef.current.isActive = true;
      buttonRef.current.setState("active")
    }
    
    buttonRef.current.add(dummy)
    dummy.lookAt(0,0,0);
    console.log(dummy.rotation)
    q.setFromEuler(dummy.rotation).invert()
    axesRef.current.setRotationFromQuaternion(q)
    buttonRef.current.remove(dummy);

    switch(translateAxesStr){
      case "XY":
        yRef.current.scale.set(3,1,3);
      case "X":
        xRef.current.scale.set(1,3,3);
        break;
      case "YZ":
        zRef.current.scale.set(3,3,1);
      case "Y":
        yRef.current.scale.set(3,1,3);
        break;
      case "ZX":
        xRef.current.scale.set(1,3,3);
      case "Z":
        zRef.current.scale.set(3,3,1);
        break;
      case "XYZ":
        xRef.current.scale.set(1,3,3);
        yRef.current.scale.set(3,1,3);
        zRef.current.scale.set(3,3,1);
    }
    
    return () => {
      unsubModeStore();
    }
  },[])

  useFrame(()=>{
    // console.log(buttonRef.current.getWorldQuaternion(q))
  })
  return (
    <Button 
      ref={buttonRef}
      textContent={translateAxesStr} 
      onClick={()=>{updateTranslateAxes(translateAxesStr)}}
      {...props} 
    >
      <block offset={0.2} args={[{width:0.001,height:0.001, borderOpacity:0,backgroundOpacity:0,}]}>
        <group ref={axesRef} >
          <Box ref={xRef} args={[0.2,0.01,0.01]} material-color="red" />  
          <Box ref={yRef} args={[0.01,0.2,0.01]} material-color="green" />
          <Box ref={zRef} args={[0.01,0.01,0.2]} material-color="blue" />
        </group>
      </block>
    </Button>
  )
}


function FixAxisButton( {axisStr, type, ...props}){
  const buttonRef = useRef();
  const capitalType = type.charAt(0).toUpperCase()+type.slice(1);
  // console.log(capitalType);
  const updateAxes = useModeStore.getState()["update"+capitalType+"Axes"];
  // console.log(useModeStore.getState()["update"+capitalType+"Axes"])
  // console.log(updateAxes)
  const setIndex = () => {
    if (axisStr === "X") return 0;
    if (axisStr === "Y") return 1;
    if (axisStr === "Z") return 2;
  }
  const i = setIndex()
  // console.log(i)
  
  const axesRef = useRef();
  const q = new THREE.Quaternion;
  const dummy = new THREE.Object3D;
  // const axisGeo = {length:0.2, width:0.01}
  const xRef = useRef();
  const yRef = useRef();
  const zRef = useRef();

  useEffect(() => {
    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        // console.log(state.rotateAxes)
        // buttonRef.current.isActive = state.rotateAxes[i];
        buttonRef.current.isActive = state[type+"Axes"][i];
      }
    )

    if(useModeStore.getState()[type+"Axes"][i]) buttonRef.current.setState("active");
    
    

    switch(axisStr){
      case "X":
        xRef.current.scale.set(1,5,5);
        break;
      case "Y":
        yRef.current.scale.set(5,1,5);
        break;
      case "Z":
        zRef.current.scale.set(5,5,1);
        break;
    }
    
    return () => {
      unsubModeStore();
    }
  },[])

  let j=0
  useFrame(() =>{
    if(j<1){
      // console.log(axesRef.current.getWorldQuaternion(q))
      axesRef.current.getWorldQuaternion(q)
      axesRef.current.setRotationFromQuaternion(q.invert())
      j++
    }
  })

  return (
    <Button 
      ref={buttonRef}
      textContent={axisStr} 
      onClick={()=>{updateAxes(axisStr)}}
      {...props} 
    >
      {/* <block offset={0.2} args={[{width:0.001,height:0.001, borderOpacity:0,backgroundOpacity:0,}]}> */}
        <group ref={axesRef} 
        position={[0,0,0.2]} 
        >
          {/* <Box ref={xRef} args={[3,0.01,0.01]} material-color="red" />  
          <Box ref={yRef} args={[0.01,3,0.01]} material-color="green" />
          <Box ref={zRef} args={[0.01,0.01,3]} material-color="blue" /> */}
          <Box ref={xRef} args={[0.3,0.01,0.01]} material-color="red" />  
          <Box ref={yRef} args={[0.01,0.3,0.01]} material-color="green" />
          <Box ref={zRef} args={[0.01,0.01,0.3]} material-color="blue" />
        </group>
      {/* </block> */}
    </Button>
  )
}
function FixRotateButton( {axisStr, ...props}){
  const buttonRef = useRef();
  const updateRotateAxes = useModeStore.getState().updateRotateAxes;
  const setIndex = () => {
    if (axisStr === "X") return 0;
    if (axisStr === "Y") return 1;
    if (axisStr === "Z") return 2;
  }
  const i = setIndex()
  // console.log(i)
  
  const axesRef = useRef();
  const q = new THREE.Quaternion;
  const dummy = new THREE.Object3D;
  // const axisGeo = {length:0.2, width:0.01}
  const xRef = useRef();
  const yRef = useRef();
  const zRef = useRef();

  useEffect(() => {
    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        // console.log(state.rotateAxes)
        buttonRef.current.isActive = state.rotateAxes[i];
      }
    )

    if(useModeStore.getState().rotateAxes[i]) buttonRef.current.setState("active");
    
    axesRef.current.position.y += 0.05;

    buttonRef.current.add(dummy)
    dummy.lookAt(0,0,0);
    // console.log(dummy.rotation)
    q.setFromEuler(dummy.rotation).invert()
    axesRef.current.setRotationFromQuaternion(q)
    buttonRef.current.remove(dummy);

    switch(axisStr){
      case "X":
        xRef.current.scale.set(1,3,3);
        break;
      case "Y":
        yRef.current.scale.set(3,1,3);
        break;
      case "Z":
        zRef.current.scale.set(3,3,1);
        break;
    }
    
    return () => {
      unsubModeStore();
    }
  },[])

  return (
    <Button 
      ref={buttonRef}
      textContent={axisStr} 
      onClick={()=>{updateRotateAxes(axisStr)}}
      {...props} 
    >
      <block offset={0.2} args={[{width:0.001,height:0.001, borderOpacity:0,backgroundOpacity:0,}]}>
        <group ref={axesRef} >
          <Box ref={xRef} args={[0.2,0.01,0.01]} material-color="red" />  
          <Box ref={yRef} args={[0.01,0.2,0.01]} material-color="green" />
          <Box ref={zRef} args={[0.01,0.01,0.2]} material-color="blue" />
        </group>
      </block>
    </Button>
  )
}
