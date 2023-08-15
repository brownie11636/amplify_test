import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from "three"

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
    // justifyContent: "center",
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
    justifyContent: "start", 
    alignItems: "center"
  }

  const textContainerArgs = {
    ...args,
    width: "25%", 
    height: "100%", 
    alignItems:"center",
    // margin: 0.01, 
  }

  return (
    <LayeredBlock layer={"setting"} args={props.args}>
      <block args={[innerContainerArgs]}>
        <block args={[textContainerArgs]}>
          {/* <text _textContent-value={"fix\naxis"}/> */}
          <text args={[{textAlign:"center",}]} _textContent-value={"slide"}/>
        </block>
        <Slider args={[{...args,width:"50%",height:"100%"}]}/>
      </block>
        {/* <block args={[innerContainerArgs]} /> */}
        {/* <block args={[{...props.args,width:2}]} /> */}
    </LayeredBlock>
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
function Slider( {args,min, max, sliderSize = {width:0.1,height:0.3}, ...props}){
  const railRef = useRef();
  const sliderRef = useRef();
  const ghostRef = useRef();

  const frontRef = useRef();
  // const backRef = useRef();


  const railArgs = {
    backgroundColor: color.darkPurple,
    width: "90%",
    height: "10%",
    // alignItems:"center"
    justifyContent:"start",
    borderRadius: 0,
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
  }

  const frontArgs = {
    ...ghostArgs,
    width: "0.01%"
  }

  useEffect(() => {
    const unsubSliderData = useControlStore.subscribe(
      (state)=>state.sliderData,
      (data)=>{

      }
    )


    
    return () => {
      unsubSliderData();
    }
  },[])

  useFrame(() =>{
    // sliderRef.current.position.x = -1;
    
  })

  return (
    <block 
      // {...props}
      args={[{...args[0],borderWidth:0,justifyContent:"center"}]} 
    >
      <block ref={railRef} args={[railArgs]} >
        <block ref={frontRef} args={[frontArgs]} />   {/* 위치 조절용 */}
        <block ref={sliderRef} args={[sliderArgs]} />
        <block ref={ghostRef} args={[ghostArgs]} />   {/* 컨트롤러 제어 및 위치 탐색 용 */}
      </block>
    </block>
  )
}
