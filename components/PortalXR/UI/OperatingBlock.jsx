import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from "three"

import * as color from "./colors.js"
import * as UiStates from "./UiStates"
import LayeredBlock from "./components/LayeredBlock"
import Button from "./components/Button"
import { useModeStore } from "/store/zustand/mode.js"


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
    justifyContent: "center",
    borderRadius: 0.1,
    borderColor: color.black,
    // padding: 0.01,
    // margin: 0.01,
    borderWidth: 0.01,
  }

  const buttonArgs = { 
    ...args,
    width: 0.4, 
    height: 0.4, 
    margin: 0.04, 
    borderWidth: 0.02,
  }

  const innerContainerArgs = {
    ...args,
    // width: 2.8, 
    height: "33%", 
    alignItems: "center", 
  }

  const textContainerArgs = {
    ...args,
    width: 1.3, 
    height: 0.5, 
    // margin: 0.01, 
  }

  return (
    <LayeredBlock layer={"operating"} args={props.args} >
      <block args={[innerContainerArgs]}>
        <block args={[textContainerArgs]}>
          {/* <text _textContent-value={"fix\naxis"}/> */}
          <text _textContent-value={"Free axes\n(translating)"}/>
        </block>
        <AxisButton axisStr={"X"} type={"translating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <AxisButton axisStr={"Y"} type={"translating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <AxisButton axisStr={"Z"} type={"translating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
      </block>
      <block args={[innerContainerArgs]}>
        <block args={[textContainerArgs]}>
          <text _textContent-value={"Free axes\n(rotating)"}/>
        </block>       
        <AxisButton axisStr={"X"} type={"rotating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <AxisButton axisStr={"Y"} type={"rotating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <AxisButton axisStr={"Z"} type={"rotating"} args={[buttonArgs]} stateAttribute={UiStates.button} />
      </block>
      <block args={[innerContainerArgs]}>
        <block args={[textContainerArgs]}>
          <text _textContent-value={"align\naxes"}/>
        </block>       
        <AxisButton axisStr={"X"} type={"aligned"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <AxisButton axisStr={"Y"} type={"aligned"} args={[buttonArgs]} stateAttribute={UiStates.button} />
        <AxisButton axisStr={"Z"} type={"aligned"} args={[buttonArgs]} stateAttribute={UiStates.button} />
      </block>
    </LayeredBlock>
  )
}


function AxisButton( {axisStr, type, ...props}){
  const buttonRef = useRef();
  const capitalType = type.charAt(0).toUpperCase()+type.slice(1);
  // console.log(capitalType);
  const updateAxes = useModeStore.getState()["update"+capitalType+"Axes"];
  // console.log(useModeStore.getState()["update"+capitalType+"Axes"])
  // console.log(updateAxes)
  // const setIndex = () => {
  //   if (axisStr === "X") return 0;
  //   if (axisStr === "Y") return 1;
  //   if (axisStr === "Z") return 2;
  // }
  const i = axisStr.charCodeAt([0]) - 88;  //88: ASCII code of "X", axisStr shoud be "X"||"Y"||"Z"
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
        if (!state[type+"Axes"][i]) buttonRef.current.setState("idle")
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
      onClick={()=>{
        updateAxes(axisStr)
        // console.log("states")
        // console.log(useModeStore.getState().rotatingAxes)
        // console.log(useModeStore.getState().alignedAxes)
      }}
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
