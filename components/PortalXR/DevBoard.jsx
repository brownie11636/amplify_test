import * as THREE from 'three'
import { createContext, forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from "@react-three/drei"
import { useXR } from '@react-three/xr'

import { GamepadContext } from "./GamepadContext"

const RAD2DEG = THREE.MathUtils.RAD2DEG;
const DEG2RAD = THREE.MathUtils.DEG2RAD;

export default function DevBoard({width, height, children, ...props}) {
  
  const gamepadRef = useContext(GamepadContext)
  const [button, setButton ]= useState();

  useFrame((state, delta, XRFrame) => {
    // console.log(gamepadRef.current)
    setButton(gamepadRef.current.left.new.buttons[0])
  })

  // useEffect(()=>{
  //   setButton(gamepadRef.current.left.new.buttons[0])
  // },[gamepadRef.current.left.new.buttons[0]])
  return (
    <group position={[10,0,-10]} rotation={[0,-45*DEG2RAD,0]}>
      <Html
        style={{
          width: 200,
          height: 200
        }}
        transform
        occulde={true}
      >
        <div
          style={{
            backgroundColor:"#ffffff",
            fontWeight:"bold"
          }}
        >
          <span>
            HEEs
            {button}
          </span>
        </div>
      </Html>
    </group>
  )
}