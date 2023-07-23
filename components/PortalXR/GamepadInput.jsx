import * as THREE from 'three'
import { createContext, forwardRef, useRef, useState, useMemo, useEffect, useContext} from 'react'
import { useFrame } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { shallow } from "zustand/shallow"

import { useXRStore } from "../../store/zustand/XR"
import * as myGamepadInput from '../../libs/XR/myGamepadInput'

const deadZone = 0.1; 
const threshold = 0.7 
// const buttonThreshold = 

export const GamepadInput = (props) => {

  const { session } = useXR();
  const gamepadRef = useRef(myGamepadInput.create());
  const [
    updateTriggerPressed_R,
    updateSqueezePressed_R,
    updateTouchpadPressed_R,
    updateStickPressed_R,
    updateButtonAPressed_R,
    updateButtonBPressed_R,
    updateTouchpadRight_R,
    updateTouchpadLeft_R,
    updateTouchpadUp_R,
    updateTouchpadDown_R,
    updateStickRight_R,
    updateStickLeft_R,
    updateStickUp_R,
    updateStickDown_R,
    updateTriggerPressed_L,
    updateSqueezePressed_L,
    updateTouchpadPressed_L,
    updateStickPressed_L,
    updateButtonXPressed_L,
    updateButtonYPressed_L,
    updateTouchpadRight_L,
    updateTouchpadLeft_L,
    updateTouchpadUp_L,
    updateTouchpadDown_L,
    updateStickRight_L,
    updateStickLeft_L,
    updateStickUp_L,
    updateStickDown_L,
  ] = useXRStore((state) => [
    state.updateTriggerPressed_R,
    state.updateSqueezePressed_R,
    state.updateTouchpadPressed_R,
    state.updateStickPressed_R,
    state.updateButtonAPressed_R,
    state.updateButtonBPressed_R,
    state.updateTouchpadRight_R,
    state.updateTouchpadLeft_R,
    state.updateTouchpadUp_R,
    state.updateTouchpadDown_R,
    state.updateStickRight_R,
    state.updateStickLeft_R,
    state.updateStickUp_R,
    state.updateStickDown_R,
    state.updateTriggerPressed_L,
    state.updateSqueezePressed_L,
    state.updateTouchpadPressed_L,
    state.updateStickPressed_L,
    state.updateButtonXPressed_L,
    state.updateButtonYPressed_L,
    state.updateTouchpadRight_L,
    state.updateTouchpadLeft_L,
    state.updateTouchpadUp_L,
    state.updateTouchpadDown_L,
    state.updateStickRight_L,
    state.updateStickLeft_L,
    state.updateStickUp_L,
    state.updateStickDown_L,
  ])


  // const pad = gamepadRef.current;

  useFrame((state, delta, XRFrame) => {
    if(XRFrame){
      gamepadRef.current = myGamepadInput.get(session, gamepadRef.current)
      // let now = gamepadRef.current.right.new.buttons[0];
      // let prev = gamepadRef.current.right.prev.buttons[0];

      // if (now > threshold && prev < threshold ) {
      //   updateTriggerPressed_R(true);
      //   console.log("pressed!")
      // }
      // else if (now < threshold && prev > threshold ) {
      //   updateTriggerPressed_R(false);
      //   console.log("released!")
      // }
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

      // console.log(gamepadRef.current.left.new.buttons)
      // console.log(gamepadRef)
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
    console.log("pressed!")
  }
  else if (now < threshold && prev > threshold ) {
    updateFn0(false);
    console.log("released!")
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