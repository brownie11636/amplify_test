import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'
import { useInteraction } from '@react-three/xr'
import { Box } from '@react-three/drei'
import _ from "lodash"

import SimpleStateBehavior from "./behavior/states/SimpleStateBehavior"

import * as color from "./colors.js"
import * as UiStates from "./UiStates"
import LayeredBlock from "./components/LayeredBlock"
import Button from "./components/Button"
import { useControlStore } from "/store/zustand/control.js"
import { useModeStore } from "/store/zustand/mode.js"

import { RayGrab } from "@react-three/xr"

/**
 * TODO:
 *  슬라이드 형태의 UI 세팅?
 *  컨트롤러 버튼을 통한 세팅? 이를 안내하는 UI?
 *    <RayGrab /> 보기
 *    or onSelect를 통해 컨트롤러와 바인딩
 *    or threejs example/webxr/pointerdrag 요게 딱이다
 */

export default function SettingBlock(props) {

  const args = {
    width: "100%",
    height: "100%",
    backgroundColor: color.portalPurple,
    // backgroundOpacity: 1,
    flexDirection: "row",   
    alignItems:"center", 
    // justifyContent: "center",
    borderRadius: 0.1,
    borderColor: color.black,
    // padding: 0.01,
    // margin: 0.01,
    borderWidth: 0.01,
  }

  const buttonArgs = { 
    ...args,
    width: 0.35,
    height: 0.35, 
    margin: [0,0.1,0,0.05], 
    borderWidth: 0.02,
  }

  const innerContainerArgs = {
    ...args,
    // width: 2.8, 
    height: "50%", 
    justifyContent: "start", 
  }

  const textContainerArgs = {
    ...args,
    width: "27%", 
    // margin: 0.01, 
  }

  const positionContainerArgs = {
    ...args,
    width: "25%", 
    flexDirection:"row", 
    justifyContent:"stretch"
    // margin: 0.01, 
  }

  const rotationContainerArgs = {
    ...positionContainerArgs,
    width: "33%"
  }

  //  const ref = useRef();
   const spatialVideoTextRef = useRef();
   const remoteGroupTextRef = useRef();
  // const testRef = useRef();
  useEffect(()=>{
    spatialVideoTextRef.current.addAfterUpdate(()=>{
      spatialVideoTextRef.current.rotation.z = Math.PI/2
      spatialVideoTextRef.current.position.x = -0.05;
      spatialVideoTextRef.current.position.y = 0;
    })
    // remoteGroupTextRef.current.addAfterUpdate(()=>{
    //   remoteGroupTextRef.current.rotation.z = Math.PI/2
    //   remoteGroupTextRef.current.position.x = -0.05;
    //   remoteGroupTextRef.current.position.y = 0;
    // })
    return () => {

    }
  },[])

  return (
    <LayeredBlock layer={"setting"} args={props.args}>

      <block args={[innerContainerArgs]}>

        <block args={[{...textContainerArgs}]}>
          <block args={[{...args, width:"40%"}]}>
            <text ref={spatialVideoTextRef} args={[{width:"200%", height:"50%", textAlign:"center",}]} _textContent-value={"Spatial\nvideo"}/>
          </block>
          <block args={[{...args, width:"60%", flexDirection:"column"}]}>
            <text args={[{...args, height:"50%", textAlign:"center",}]} _textContent-value={"pos,scale"}/>
            <text args={[{...args, height:"50%", textAlign:"center",}]} _textContent-value={"rotation"}/>
          </block>
        </block>

        <block args={[{ ...args, width: "73%", flexDirection:"column" }]} >
          <block args={[{ ...args, height: "50%", }]} >
            <ButtonContainer args={[positionContainerArgs]} target={"spatialVideo"} axisStr={"X"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"spatialVideo"} axisStr={"Y"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"spatialVideo"} axisStr={"Z"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"spatialVideo"} axisStr={"S"} type={"scale"} />
          </block>
          <block args={[{ ...args, height: "50%", }]} >
            <ButtonContainer args={[rotationContainerArgs]} target={"spatialVideo"} axisStr={"X"} type={"rotation"} />
            <ButtonContainer args={[rotationContainerArgs]} target={"spatialVideo"} axisStr={"Y"} type={"rotation"} />
            <ButtonContainer args={[rotationContainerArgs]} target={"spatialVideo"} axisStr={"Z"} type={"rotation"} />
          </block>
        </block>

      </block>

      <block args={[{...innerContainerArgs,height:"25%"}]}>

        <block args={[{...textContainerArgs, alignItems:"start"}]}>
          <block args={[{...args, width:"50%"}]}>
            <text ref={remoteGroupTextRef} args={[{...args,textAlign:"center",}]} _textContent-value={"remote"}/>
            {/* <text ref={remoteGroupTextRef} args={[{width:"200%", height:"50%", textAlign:"center",}]} _textContent-value={"remote"}/> */}
          </block>
          <block args={[{...args, width:"50%", flexDirection:"column"}]}>
            <text args={[{...args, textAlign:"center",}]} _textContent-value={"pos,scale"}/>
            {/* <text args={[{...args, height:"50%", textAlign:"center",}]} _textContent-value={"scale"}/> */}
          </block>
        </block>

        <block args={[{ ...args, width: "73%", flexDirection:"column" }]} >
          <block args={[args]} >
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"X"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"Y"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"Z"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"S"} type={"scale"} />
          </block>
        </block>

      </block>

      <block args={[{...innerContainerArgs,height:"25%"}]}>
        
        <block args={[{...textContainerArgs, width:"20%", alignItems:"start"}]}>
          <block args={[args]}>
            <text ref={remoteGroupTextRef} args={[{...args,textAlign:"center",}]} _textContent-value={"camera properties"}/>
          </block>
          {/* <block args={[{...args, width:"50%", flexDirection:"column"}]}>
            <text args={[{...args, textAlign:"center",}]} _textContent-value={"pos,scale"}/>
          </block> */}
        </block>

        <block args={[{ ...args, width: "80%", flexDirection:"column" }]} >
          <block args={[args]} >
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"X"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"Y"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"Z"} type={"position"} />
            <ButtonContainer args={[positionContainerArgs]} target={"remoteGroup"} axisStr={"S"} type={"scale"} />
          </block>
        </block>

      </block>
        {/* <SliderInput args={[{...args,width:"50%",height:"100%"}]} stateAttribute={UiStates.button} /> */}
    </LayeredBlock>
  )
}

function ButtonContainer ({target, axisStr, type, ...props}) {
  const args = {
    backgroundColor: color.portalPurple,
    alignItems:"center", 
    // justifyContent: "center",
    borderRadius: 0.1,
    borderColor: color.black,
    // padding: 0.01,
    // margin: 0.01,
    borderWidth: 0.01,
  }
  
  const buttonArgs = { 
    ...args,
    width: 0.35,
    height: 0.35, 
    margin: [0,0.05,0,0], 
    borderWidth: 0.02,
  }

  const textRef = useRef();
  const axisLowercase = String.fromCharCode(axisStr.charCodeAt([0]) + 32)
  const i = axisStr.charCodeAt([0]) - 88;
  const initialValue = (type !== "scale") ? useControlStore.getState()[target][type][i]
                                          : useControlStore.getState()[target][type];
  const vrLog = useControlStore.getState().updateNewLog;

  useEffect(()=>{
    const unsubStore = useControlStore.subscribe(
      (state)=>state[target],
      (targetState,_targetState) => {     // _value is previous, range is not used yet 
        // vrLog(targetState[type])
        
        if (type !== "scale"){
          if ( targetState[type][i] !== _targetState[type][i]){
            textRef.current.set({
              textContent: 
                (type === "rotation") ? (targetState[type][i]*180/Math.PI).toFixed(2)
                                      : targetState[type][i].toFixed(2),
            })
          }
        } else {
          if ( targetState[type] !== _targetState[type]){
            textRef.current.set({
              textContent: targetState[type].toFixed(2),
            })
          }
        }

      }
    );
    return () => {
      unsubStore();
    }
  },[])

  return (
    <block args={props.args}>
      <SettingModeButton target={target} axisStr={axisStr} type={type} args={[buttonArgs]} stateAttribute={UiStates.button} />
      <text ref={textRef} 
        args={[{
          textContent: 
            (type === "rotation") ? (initialValue*180/Math.PI).toFixed(2)
                                  : initialValue.toFixed(2)
        }]} 
      />
    </block>
  )
}


function SettingModeButton({target, axisStr, type, ...props}){
  
  const buttonRef = useRef();
  // console.log(i)
  
  const axesRef = useRef();
  const q = new THREE.Quaternion;
  const xRef = useRef();
  const yRef = useRef();
  const zRef = useRef();

  const mode = {
    target: target,
    type: type, 
    axis: axisStr, 
    index: axisStr? axisStr.charCodeAt([0]) - 88 : null
  };

  useEffect(() => {
    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {
        if (state.settingMode !== prevState.settingMode){
          if (_.isEqual(state.settingMode, mode)){
          // if (state.settingMode === type+axisStr){
            console.log(state.settingMode)
            buttonRef.current.isActive = true
            buttonRef.current.setState("active")
          } else {
            buttonRef.current.isActive = false
            buttonRef.current.setState("idle")
          }
        }
      }
    )

    // if(useModeStore.getState()[type+"Axes"][i]) buttonRef.current.setState("active");
    
    // console.log(axisStr)
    // console.log(i)
    // console.log(useModeStore.getState()[type+"Axes"][i])
    // console.log(useModeStore.getState()[type+"Axes"])

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
      case "XYZ":
        xRef.current.scale.set(1,5,5);
        yRef.current.scale.set(5,1,5);
        zRef.current.scale.set(5,5,1);
      case "S":
        xRef.current.parent.remove(xRef.current, yRef.current, zRef.current)
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
        useModeStore.setState({settingMode: {...mode}})
      }}
      {...props} 
    >
        <group ref={axesRef} 
        position={[0,0,0.2]} 
        >
          <Box ref={xRef} args={[0.2,0.01,0.01]} material-color="red" />  
          <Box ref={yRef} args={[0.01,0.2,0.01]} material-color="green" />
          <Box ref={zRef} args={[0.01,0.01,0.2]} material-color="blue" />
        </group>
    </Button>
  )
}


/**
 * IDEA:
 *    슬라이드 버튼과 ghost 슬라이드 버튼을 만듬
 *    슬라이드 버튼의 포지션은 slideRef.current.parent.worldToLocal(ghostRef.current.getWorldPosition) 의 (x,0,0)를 따라다님
 *    onSelect되면 e.target.controller 로 컨트롤러 정보를 가져옴
 *    onFrame 안에서 고스트 슬라이드 버튼은 컨트롤러에 attach
 *    onSelectEnd 되면 ghost의 포지션은 슬라이드 버튼을 복사
 *    이동말고 앞에 투명 ref 달아서 걔 크기 조절
 */
function SliderInput( {args, initialValue, min, max, stateAttribute, sliderSize = {width:0.1,height:0.3}, onUpdate, ...props}){
  const containerRef = useRef();
  
  const railRef = useRef();
  const sliderRef = useRef();
  const ghostRef = useRef();

  const frontRef = useRef();
  // const backRef = useRef();
  const sliderX = useRef(0);
  const minX = useRef(0);
  const maxX = useRef(0);


  const railArgs = {
    backgroundColor: color.darkPurple,
    width: "90%",
    height: "10%",
    // alignItems:"center",
    // alignItems:"start",
    justifyContent:"start",
    borderRadius: 0,
    autoLayout: false,

  }

  const sliderArgs = {
    ...railArgs,
    ...sliderSize,
    backgroundOpacity: 1,
    // autoLayout: false,
  }

  const ghostArgs = {
    height: sliderArgs.height,
    width: sliderArgs.width,
    backgroundOpacity: 0,
    borderWidth: 0.02,
  }

//XR button Click
useInteraction(ghostRef,"onHover",() => sliderRef.current.setState("hovered"))
useInteraction(ghostRef,"onBlur",() => sliderRef.current.setState("idle"))
useInteraction(ghostRef,"onSelectStart",()=>sliderRef.current.setState("selected"))
useInteraction(ghostRef,"onSelectEnd",(e)=>{
  console.log(e)
  // e.stopPropagation()
  sliderRef.current.setState("hovered")
  console.log("swicthMode button clicked")
  // onClick()
  onUpdate()
  // button.current.frame.layers.set(0)})
});

  useEffect(() => {

    new SimpleStateBehavior(sliderRef.current, stateAttribute)
    sliderRef.current.setState("idle")

    // frontRef.current.needsUpdate = true;
    railRef.current.addAfterUpdate(()=>{
      minX.current = -railRef.current.children[0].scale.x/2;
      maxX.current = railRef.current.children[0].scale.x/2
    });

    return () => {

    }
  },[])

  useFrame(() =>{

    console.log(railRef.current)

    sliderRef.current.position.x = sliderX.current;
    containerRef.current.position.z = 1
  })

  return (
    <block 
      // {...props}
      ref={containerRef}
      args={[{...args[0],borderWidth:0,justifyContent:"center"}]} 
    >
      <block ref={railRef} args={[railArgs]} >
        <block ref={sliderRef} args={[sliderArgs]} />
        <block ref={ghostRef} args={[ghostArgs]} 
          onPointerEnter={() => sliderRef.current.setState('hovered')}
          // onPointerLeave={() => buttonRef.current.setState('idle')}
          onPointerLeave={()=>setInactiveState('idle')}
          // onPointerLeave={() => {
          //   if ( stateAttribute.active && buttonRef.current.isActive === true ) {
          //     buttonRef.current.setState("active")
          //   } else buttonRef.current.setState("idle");
          // }}
          onPointerDown={() => sliderRef.current.setState('selected')}
          onPointerUp={(e) => {
            e.stopPropagation();
            sliderRef.current.setState('hovered')
            onUplick()
          }}
        />   {/* 컨트롤러 제어 및 위치 탐색 용 */}
      </block>
    </block>
  )
}
