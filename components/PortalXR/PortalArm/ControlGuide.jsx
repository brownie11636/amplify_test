import _ from "lodash"
import * as THREE from 'three'
import { forwardRef, useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Box } from "@react-three/drei"
import { useController } from '@react-three/xr'

import { useXRGamepadStore } from "../../../store/zustand/XRGamepad.js"
import { useModeStore } from "../../../store/zustand/mode.js"
import { useControlStore } from "../../../store/zustand/control.js"


// import Box from './boxes'
const DEG2RAD = THREE.MathUtils.DEG2RAD;
const RAD2DEG = THREE.MathUtils.RAD2DEG;

/**
 * squeeze 했을때만 controller와 6dof 동기화 
 * socket명령을 보낼때는 armbase(armRef[0])와의 상대위치를 보내야하니까 상위 컴포넌트에서 보냄
 * 축 고정 및 정렬 등과 같은 상태값에따른 거동은 컴포넌트 내에서 처리
 * 
 * align시에 포지션 및 로테이션이 바뀔텐데 이전 값도 갖고 있어야함 squeeze가 풀리면 해당작업을 하도록 함 
 * nonAlignedStateRef.current에 이전값을 저장하고 이걸 기준으로 rotation을 set하는 걸로
 * 이 값은 컨트롤러가 아니라 로봇의 state를 저장하고 있는걸로 볼 수 있음
 * 
 * 처리했음 - 초기 rotation 및 position 세팅은 gripper의 위치 참조해서 상위 컴포넌트에서 설정함.
 * align시에 가까운 방향으로 정렬하게 해야함
 * 
 * TODO:
 *  align 했을때 바로 반영
 *  
 */


/**
 * 
 * TODO: threejs example/webxr/pointdrag 처럼 
 * attach함수를 쓴듯한 거동을 활용하는 세팅도 설정할 수 있도록
 * 
 */
const ControlGuide = forwardRef( function ControlGuide ({ initialConfig, ...props}, ref) {
  if (!ref) ref = useRef();

  const vrLog = useControlStore.getState().updateNewLog;
  
  const rightController = useController('right');
  const squeezePressed_R = useRef({now:false, prev:false})

  const controlRef = useRef();
  const initialRotationRef = useRef();
  const globalAxisRef = useRef();

  const translatingAxesRef = useRef(useModeStore.getState().translatingAxes);
  const rotatingAxesRef = useRef(useModeStore.getState().rotatingAxes);
  const alignedAxesRef = useRef(useModeStore.getState().alignedAxes);
  const coordinateRef = useRef(useModeStore.getState().coordinate)

  const rotatingOrder = useRef("XYZ");
  const getRotatingOrder = (rotatingAxes, alignedAxes, coordinate) => {
    let end = ""
    let order = ""
    let isBase = (coordinate === "base"); //true @ base, false @ TCP
    let axes = _.isEqual(rotatingAxes,[false,false,false])? alignedAxes : rotatingAxes;
    
    order = axes.reduce((a,c,i)=> {
      if (c === isBase) return a + String.fromCharCode(i+88);
      else {
        end = end + String.fromCharCode(i+88);
        return a
      }
    },"")

    return order + end;
  }
  
  const getAlignIndex = (alignedAxes) => alignedAxes.reduce((a,c) => a + c);
  const alignIndex = useRef({now:getAlignIndex(alignedAxesRef.current), prev:0})
  const needAlignAngle = useRef(false);
  const alignAngle = useRef([]);
  const alignUnitAngle = useRef(0.5*Math.PI)

  const controllerModeRef = useRef(useModeStore.getState().controllerModeRef)

  const nonAlignedRef = useRef(new THREE.Euler());

  const offsetRef = useRef({position:new THREE.Vector3(), quaternion:new THREE.Quaternion(),})
  offsetRef.current.quaternion.identity();
  const isOffsetUpdated = useRef(false);
  let q = new THREE.Quaternion();
  let e = new THREE.Euler();

  const controlAxesHelper = new THREE.AxesHelper(1);
  const controlHelper = new THREE.Group();
  controlHelper.rotation.set(-0.5*Math.PI,0,0);
  controlHelper.add(controlAxesHelper);
  

  useEffect(()=>{
    
    const unsubXRGamepadStore = useXRGamepadStore.subscribe((state) => {
      squeezePressed_R.current.prev = squeezePressed_R.current.now;
      squeezePressed_R.current.now = state.squeezePressed_R
    })

    const unsubModeStore = useModeStore.subscribe(
      (state, prevState) => {

        controllerModeRef.current = state.controllerMode;
        
        translatingAxesRef.current = state.translatingAxes;
        rotatingAxesRef.current = state.rotatingAxes;
        alignedAxesRef.current = state.alignedAxes;
        coordinateRef.current = state.coordinate;
        
        alignIndex.current.prev = alignIndex.current.now
        alignIndex.current.now = getAlignIndex(state.alignedAxes);
        
        rotatingOrder.current = getRotatingOrder(
          rotatingAxesRef.current, 
          alignedAxesRef.current,
          coordinateRef.current
        );
        
        // let isRotatingReleased = rotatingAxesRef.current.reduce((a,c,i)=>{
        //   return a || (c === false && prevState.rotatingAxes[i] === true)
        // }, false)
        
        ref.current.rotation.reorder(rotatingOrder.current)

        if (alignIndex.current.now !== alignIndex.current.prev && alignIndex.current.now !== 0){ 

          needAlignAngle.current = true;
          if (alignIndex.current.prev === 0) nonAlignedRef.current.copy(ref.current.rotation.clone());

        }
        // console.log(needAlignAngle.current)
      }
    )
    
    // rightController.controller.add(controlHelper);
    
    return () => {
      unsubXRGamepadStore();
      unsubModeStore();
      // if(controlHelper.parent === rightController.controller){
      //   rightController.controller.remove(controlHelper);
      // }
    }
  },[])

  const controller = {
    localPosition: new THREE.Vector3(), 
    rotation: new THREE.Euler(),
  }
  
  let axis = "";
  let tmp_q = new THREE.Quaternion();
  useFrame((state,delta,xrFrame) => {
    if (rightController){
      if(controlHelper.parent !== rightController.controller){
          rightController.controller.add(controlHelper);
        }
      if (!squeezePressed_R.current.now){   // squeeze released (it can be replaced by the case when trigger value true -> false)

        isOffsetUpdated.current = false;

      } else if ( controllerModeRef.current === "operating" ) {  //squeeze pressed
        
        //convert coordinate of position
        controller.localPosition.copy(
          ref.current.parent.worldToLocal(
            // rightController.controller.position));
            controlHelper.getWorldPosition(controller.localPosition)));

        // get quaternion
        // rightController.controller.getWorldQuaternion(q)
        controlHelper.getWorldQuaternion(q)

        // calculate offset only in the first frame of squeezing session
        if (isOffsetUpdated.current === false){
          // position offset
          offsetRef.current.position.subVectors(ref.current.position, controller.localPosition);
          // quaternion offset
          ref.current.getWorldQuaternion(offsetRef.current.quaternion);
          offsetRef.current.quaternion.premultiply(q.clone().invert());
          
          isOffsetUpdated.current = true;
        }

        q.multiply(offsetRef.current.quaternion);
        controller.rotation.setFromQuaternion(q);
        controller.rotation.reorder(rotatingOrder.current);
        
        // update ref position and rotation
        // ref.current.position = controller.localPosition + offset.current.position
        translatingAxesRef.current.forEach((val,i) => {
          axis = String.fromCharCode(i+120);  //ascii of x,y,z are 120, 121, 122
          if ( val === true ) {     
            ref.current.position[axis] = controller.localPosition[axis] + offsetRef.current.position[axis]
            // ref.current.position[axis] = controller.localPosition[axis] 
          }
        })

        if(needAlignAngle.current){
          alignAngle.current = [0,0,0];
          console.log(alignIndex.current.now)
          console.log(rotatingOrder.current)
          // ref.current.rotation.reorder(rotatingOrder.current)
          for (let i=0;i<1+alignIndex.current.now;i++){

            if (coordinateRef.current === "TCP"){
              axis = rotatingOrder.current.toLowerCase().slice(i,i+1)
            } else if (coordinateRef.current === "base"){
              axis = rotatingOrder.current.toLowerCase().slice(2-alignIndex.current.now+i,2-alignIndex.current.now+i+1)
            }
            // console.log(2-alignIndex.current.now+i)
            // console.log(axis)

            alignAngle.current[i] = (ref.current.rotation[axis] + 2.0*Math.PI) % alignUnitAngle.current;
            
            if( alignAngle.current[i] > 0.5*alignUnitAngle.current ) alignAngle.current[i] -= alignUnitAngle.current;

            ref.current.rotation[axis] -= alignAngle.current[i];
            // console.log(axis,": ",ref.current.rotation[axis]*RAD2DEG)

          }
          needAlignAngle.current = false;
        }


        // console.log("dsfasd")
        rotatingAxesRef.current.forEach((val,i) => {
          axis = String.fromCharCode(i+120);  //ascii of x,y,z are 120, 121, 122
          if ( val === true ) {     
            ref.current.rotation[axis] = controller.rotation[axis] 
            // console.log(ref.current.rotation[axis]*RAD2DEG)
          }
        })
      }
    }
    // ref.current.getWorldQuaternion(tmp_q)
    // globalAxisRef.current.rotation.setFromQuaternion(ref.current.getWorldQuaternion().invert())
    globalAxisRef.current.rotation.setFromQuaternion(ref.current.getWorldQuaternion(tmp_q).invert())
  })

  useEffect(()=>{
    vrLog("controlGuide is rendered!")
  })

  return (
    <group ref={controlRef} >
      <group ref={initialRotationRef} >
        <group ref={ref} {...props} >
          <Box args={[0.2,0.01,0.01]} position={[0.05, 0, 0]} material-color="red"/>
          <Box args={[0.01,0.2,0.01]} position={[0, 0.05, 0]} material-color="green"/>
          <Box args={[0.01,0.01,0.2]} position={[0, 0, 0.05]} material-color="blue"/>

          {/* <Box args={[0.2,0.01,0.01]} material-color="red"/>
          <Box args={[0.01,0.2,0.01]} material-color="green"/>
          <Box args={[0.01,0.01,0.2]} material-color="blue"/> */}
          <axesHelper ref={globalAxisRef} args={[0.5]}/>
        </group>
      </group>
    </group>
  );
});

export default ControlGuide