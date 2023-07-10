import * as THREE from 'three'
import { createContext, forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Text } from "@react-three/drei"
import { useXR, useController } from '@react-three/xr'

import { GamepadContext } from "./GamepadContext"

const RAD2DEG = THREE.MathUtils.RAD2DEG;
const DEG2RAD = THREE.MathUtils.DEG2RAD;

export default function DevBoard({width, height, children, ...props}) {
  
  const gamepadRef = useContext(GamepadContext)
  const [button, setButton ]= useState();
  const rightController = useController('right');
  const leftController = useController('left');
  const [conPos, setConPos] = useState(0)

  useFrame((state, delta, XRFrame) => {
    // console.log(gamepadRef.current)
    setButton(gamepadRef.current.left.new.buttons[0])
    if(rightController){
      const{ grip: controller } = rightController
      const position = new THREE.Vector3().copy(controller.position)
      // commClient.socket.~~emmit``
      setConPos(conPos => position.x)
    }

  })

  // useEffect(()=>{
  //   setButton(gamepadRef.current.left.new.buttons[0])
  // },[gamepadRef.current.left.new.buttons[0]])
  return (
      <Text position={[-10,1,-10]} rotation={[0,45*DEG2RAD,0]} color="black">
        HEEs {button}
        dsf {conPos}
      </Text>
  )
}