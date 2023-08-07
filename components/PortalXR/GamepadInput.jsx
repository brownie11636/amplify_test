import * as THREE from 'three'
import { createContext, forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { shallow } from "zustand/shallow"

import { useXRGamepadStore } from "../../store/zustand/XRGamepad"
import * as myGamepadInput from '../../libs/XR/myGamepadInput'

const deadZone = 0.1; 
const threshold = 0.7 

export const GamepadInput = (props) => {

  const { session } = useXR();
  const gamepadRef = useRef(myGamepadInput.create());

  const updateTriggerPressed_R = useXRGamepadStore((state)=>state.updateTriggerPressed_R);
  const updateSqueezePressed_R = useXRGamepadStore((state)=>state.updateSqueezePressed_R);
  const updateTouchpadPressed_R = useXRGamepadStore((state)=>state.updateTouchpadPressed_R);
  const updateStickPressed_R = useXRGamepadStore((state)=>state.updateStickPressed_R);
  const updateButtonAPressed_R = useXRGamepadStore((state)=>state.updateButtonAPressed_R);
  const updateButtonBPressed_R = useXRGamepadStore((state)=>state.updateButtonBPressed_R);
  const updateTouchpadRight_R = useXRGamepadStore((state)=>state.updateTouchpadRight_R);
  const updateTouchpadLeft_R = useXRGamepadStore((state)=>state.updateTouchpadLeft_R);
  const updateTouchpadUp_R = useXRGamepadStore((state)=>state.updateTouchpadUp_R);
  const updateTouchpadDown_R = useXRGamepadStore((state)=>state.updateTouchpadDown_R);
  const updateStickRight_R = useXRGamepadStore((state)=>state.updateStickRight_R);
  const updateStickLeft_R = useXRGamepadStore((state)=>state.updateStickLeft_R);
  const updateStickUp_R = useXRGamepadStore((state)=>state.updateStickUp_R);
  const updateStickDown_R = useXRGamepadStore((state)=>state.updateStickDown_R);
  const updateTriggerPressed_L = useXRGamepadStore((state)=>state.updateTriggerPressed_L);
  const updateSqueezePressed_L = useXRGamepadStore((state)=>state.updateSqueezePressed_L);
  const updateTouchpadPressed_L = useXRGamepadStore((state)=>state.updateTouchpadPressed_L);
  const updateStickPressed_L = useXRGamepadStore((state)=>state.updateStickPressed_L);
  const updateButtonXPressed_L = useXRGamepadStore((state)=>state.updateButtonXPressed_L);
  const updateButtonYPressed_L = useXRGamepadStore((state)=>state.updateButtonYPressed_L);
  const updateTouchpadRight_L = useXRGamepadStore((state)=>state.updateTouchpadRight_L);
  const updateTouchpadLeft_L = useXRGamepadStore((state)=>state.updateTouchpadLeft_L);
  const updateTouchpadUp_L = useXRGamepadStore((state)=>state.updateTouchpadUp_L);
  const updateTouchpadDown_L = useXRGamepadStore((state)=>state.updateTouchpadDown_L);
  const updateStickRight_L = useXRGamepadStore((state)=>state.updateStickRight_L);
  const updateStickLeft_L = useXRGamepadStore((state)=>state.updateStickLeft_L);
  const updateStickUp_L = useXRGamepadStore((state)=>state.updateStickUp_L);
  const updateStickDown_L = useXRGamepadStore((state)=>state.updateStickDown_L);

  useFrame((state, delta, XRFrame) => {
    if(XRFrame){
      gamepadRef.current = myGamepadInput.get(session, gamepadRef.current)
      
      callUpdateFn(gamepadRef.current.right.new.buttons[0],gamepadRef.current.right.prev.buttons[0],updateTriggerPressed_R);
      callUpdateFn(gamepadRef.current.right.new.buttons[1],gamepadRef.current.right.prev.buttons[1],updateSqueezePressed_R);
      callUpdateFn(gamepadRef.current.right.new.buttons[2],gamepadRef.current.right.prev.buttons[2],updateTouchpadPressed_R);
      callUpdateFn(gamepadRef.current.right.new.buttons[3],gamepadRef.current.right.prev.buttons[3],updateStickPressed_R);
      callUpdateFn(gamepadRef.current.right.new.buttons[4],gamepadRef.current.right.prev.buttons[4],updateButtonAPressed_R);
      callUpdateFn(gamepadRef.current.right.new.buttons[5],gamepadRef.current.right.prev.buttons[5],updateButtonBPressed_R);
      callUpdateFn(gamepadRef.current.right.new.axes[0],gamepadRef.current.right.prev.axes[0],updateTouchpadRight_R,updateTouchpadLeft_R);
      callUpdateFn(gamepadRef.current.right.new.axes[1],gamepadRef.current.right.prev.axes[1],updateTouchpadUp_R,updateTouchpadDown_R);
      callUpdateFn(gamepadRef.current.right.new.axes[2],gamepadRef.current.right.prev.axes[2],updateStickRight_R,updateStickLeft_R);
      callUpdateFn(gamepadRef.current.right.new.axes[3],gamepadRef.current.right.prev.axes[3],updateStickUp_R,updateStickDown_R);
      callUpdateFn(gamepadRef.current.left.new.buttons[0],gamepadRef.current.left.prev.buttons[0],updateTriggerPressed_L);
      callUpdateFn(gamepadRef.current.left.new.buttons[1],gamepadRef.current.left.prev.buttons[1],updateSqueezePressed_L);
      callUpdateFn(gamepadRef.current.left.new.buttons[2],gamepadRef.current.left.prev.buttons[2],updateTouchpadPressed_L);
      callUpdateFn(gamepadRef.current.left.new.buttons[3],gamepadRef.current.left.prev.buttons[3],updateStickPressed_L);
      callUpdateFn(gamepadRef.current.left.new.buttons[4],gamepadRef.current.left.prev.buttons[4],updateButtonXPressed_L);
      callUpdateFn(gamepadRef.current.left.new.buttons[5],gamepadRef.current.left.prev.buttons[5],updateButtonYPressed_L);
      callUpdateFn(gamepadRef.current.left.new.axes[0],gamepadRef.current.left.prev.axes[0],updateTouchpadRight_L,updateTouchpadLeft_L);
      callUpdateFn(gamepadRef.current.left.new.axes[1],gamepadRef.current.left.prev.axes[1],updateTouchpadUp_L,updateTouchpadDown_L);
      callUpdateFn(gamepadRef.current.left.new.axes[2],gamepadRef.current.left.prev.axes[2],updateStickRight_L,updateStickLeft_L);
      callUpdateFn(gamepadRef.current.left.new.axes[3],gamepadRef.current.left.prev.axes[3],updateStickUp_L,updateStickDown_L);

    }
  })

  useEffect(()=>{
    console.log("GamepadInput is rendered")
  })

  return (
    <>
      {props.children}
    </>
  )
};

function callUpdateFn(now, prev, updateFn0, updateFn1 = null) {

  if (now > threshold && prev < threshold ) {
    updateFn0(true);
    // console.log("pressed!")
  }
  else if (now < threshold && prev > threshold ) {
    updateFn0(false);
    // console.log("released!")
  }
  if (updateFn1 !== null) {

    if (now < -1*threshold && prev > -1*threshold ) updateFn1(true) 
    else if (now > -1*threshold && prev < -1*threshold ) updateFn1(false)

  } 
}

// const buttonNames = {
//   right: [
//     "trigger",
//     "squeeze",
//     "touchpad",
//     "stick",
//     "buttonA",
//     "buttonB"
//   ],
//   left: [
//     "trigger",
//     "squeeze",
//     "touchpad",
//     "stick",
//     "buttonX",
//     "buttonY"
//   ],
// }
// export default GamepadProvider
/**       ----- RIGHT -----
 *  buttons
 *    0: Trigger      //  gripper control    
 *    1: Squeeze      //  send right controller's 6DOF info to robot 
 *    2: Touchpad     //      
 *    3: Thumbstick   //  toggle thumstick axes' roles     
 *    4: A button     //  toggle gripper control direction      
 *    5: B button     //        
 *  
 *  axes
 *    0: Touchpad X   //    
 *    1: Touchpad Y   //        
 *    2: Thumbstick X //  spatial video z position(앞뒤)  /  y rotation 
 *    3: Thumbstick Y //  spatial video x position(좌우)  /  y position(상하)    
 * 
 */

/**       ----- LEFT -----
 *  buttons
 *    0: Trigger      //       
 *    1: Squeeze      //        
 *    2: Touchpad     //        
 *    3: Thumbstick   //      
 *    4: X button     //        
 *    5: Y button     //        
 *  
 *  axes
 *    0: Touchpad X   // left:       
 *    1: Touchpad Y   // left:       
 *    2: Thumbstick X // left:       
 *    3: Thumbstick Y // left:       
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