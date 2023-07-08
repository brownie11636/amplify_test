import * as THREE from 'three'
import { createContext, forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { useXR } from '@react-three/xr'

import * as myGamepadInput from '../../libs/XR/myGamepadInput'

export const GamepadContext = createContext();
// export const gamepadRef = useRef(myGamepadInput.create())

export const GamepadProvider = (props) => {

  const { session } = useXR();
  const gamepadRef = useRef(myGamepadInput.create());

  useFrame((state, delta, XRFrame) => {
    if(XRFrame){
      gamepadRef.current = myGamepadInput.get(session, gamepadRef.current)
      // console.log(gamepadRef.current.left.new.buttons)
      // console.log(gamepadRef)
    }
  })

  return (
    <GamepadContext.Provider value={gamepadRef}>
      {props.children}
    </GamepadContext.Provider>
  )
};
// export default GamepadProvider
/**
 *  button
 *    0: Trigger
 *    1: Squeeze
 *    2: Touchpad
 *    3: Thumbstick
 *    4: A button
 *    5: B button
 *  
 *  axes
 *    0: Touchpad X
 *    1: Touchpad Y
 *    2: Thumbstick X
 *    3: Thumbstick Y
 * 
 */

/**
    gamepadInput = {
      right: {
        new: JSON.parse(gamepadStr),
        prev: JSON.parse(gamepadStr), 
      },
      left: {
        new: JSON.parse(gamepadStr),
        prev: JSON.parse(gamepadStr), 
      }, 
    }
 */

/*
    gamepadStr = {    //webXR standard
      buttons:[
        0,    // Trigger
        0,    // Squeeze
        0,    // Touchpad Press
        0,    // Thumbstick Press
        0,    // A Button
        0,    // B Button
      ],
      axes:[
        0,    // Touchpad X
        0,    // Touchpad Y
        0,    // Thumbstick X
        0,    // Thumbstick Y
      ],
    };
 */