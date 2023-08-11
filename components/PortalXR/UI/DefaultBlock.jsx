import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from "three"

import * as color from "./colors.js"
import * as UiStates from "./UiStates"
import LayeredBlock from "./components/LayeredBlock"
import Button from "./components/Button"
import { useModeStore } from "/store/zustand/mode.js"


export default function DefaultBlock(props) {
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
    height: "50%", 
    justifyContent: "center",
    alignItems:"center", 
    lineHeight: 1,
    // padding:0.05,
  }

  const textContainerArgs = {
    ...args,
    width: 1.2, 
    height: 0.5, 
    // margin: 0.01, 
  }

  return (
    <LayeredBlock layer={"default"} args={props.args}>
      <block args={[innerContainerArgs]} >
        <text args={[{
            textContent:
              `operating:`
          }]} 
        />
        <text args={[{
            textContent:
              `squeeze right controller and play robot!
              at release, you can set axes and align.`
          }]} 
        />
      </block>
      <block args={[innerContainerArgs]} >
        <text args={[{
            textContent:
            `setting:\n
            confirm your virtual environment's scale,
            3D video's position and pose`
          }]} 
        />
      </block>
    </LayeredBlock>
  )
};