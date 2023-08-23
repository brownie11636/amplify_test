import _ from "lodash"
import * as THREE from 'three'
import { forwardRef, useRef, useEffect } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
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

  const { scene } = useThree();
  const vrLog = useControlStore.getState().updateNewLog;
  
  const rightController = useController('right');
  const squeezePressed_R = useRef({now:false, prev:false})

  const globalAxisRef = useRef();

  const translatingAxesRef = useRef(useModeStore.getState().translatingAxes);
  const rotatingAxesRef = useRef(useModeStore.getState().rotatingAxes);
  const alignedAxesRef = useRef(useModeStore.getState().alignedAxes);
  
  // const refCoordStrRef = useRef(useModeStore.getState().coordinate);
  const refCoordStrRef = useRef(useModeStore.getState().coordinate);
  const getCoordObj3d = (coordStr) => {
    vrLog(coordStr)
    let obj;
    if (coordStr === "world") obj = scene;
    else if (coordStr === "robot") obj = scene.getObjectByName("robot_COORDINATE");
    else if (coordStr === "TCP" ) obj = scene.getObjectByName("gripper_BASE");
    else obj = null;
    // console.log(obj)
    return obj
  }
  const refCoordRef = useRef(getCoordObj3d(refCoordStrRef.current));
  console.log(refCoordRef.current)
  const rotatingOrder = useRef("XYZ");
  const getRotatingOrder = (rotatingAxes, alignedAxes, coordinate) => {
    let end = ""
    let order = ""
    let isTCP = (coordinate === "TCP"); //false @ base, world. true @ TCP
    let axes = _.isEqual(rotatingAxes,[false,false,false])? alignedAxes : rotatingAxes;
    
    order = axes.reduce((a,c,i)=> {
      // if (c === false) {
      if (c === true) {
      // if (c !== isTCP) {
        return a + String.fromCharCode(i+88);
      }
      else {
        end = end + String.fromCharCode(i+88);
        return a
      }
    },"")
    vrLog(order+end)
    return order + end;
  }
  
  const getAlignIndex = (alignedAxes) => alignedAxes.reduce((a,c) => a + c);
  const alignIndex = useRef({now:getAlignIndex(alignedAxesRef.current), prev:0})
  const needAlignAngle = useRef(false);
  const alignAngle = useRef([]);
  const alignUnitAngle = useRef(0.5*Math.PI)

  const controllerModeRef = useRef(useModeStore.getState().controllerModeRef)

  const nonAlignedRef = useRef(new THREE.Euler());

  const offsetRef = useRef({position:new THREE.Vector3(), quaternion:new THREE.Quaternion(), matrix: new THREE.Matrix4(), })
  offsetRef.current.quaternion.identity();
  const isOffsetUpdated = useRef(false);

  const controlAxesHelper = new THREE.AxesHelper(1);
  const controlHelper = new THREE.Group();
  controlHelper.rotation.set(-0.5*Math.PI,0,0);
  controlHelper.add(controlAxesHelper);
  
  const useMatrixRef = useRef(false);

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
        refCoordStrRef.current = state.coordinate;
        refCoordRef.current = getCoordObj3d(refCoordStrRef.current);
        refCoordRef.current.getWorldQuaternion(qRef)
        qRefInvert.copy(qRef.clone().invert());
        
        alignIndex.current.prev = alignIndex.current.now
        alignIndex.current.now = getAlignIndex(state.alignedAxes);
        
        rotatingOrder.current = getRotatingOrder(
          rotatingAxesRef.current, 
          alignedAxesRef.current,
          refCoordStrRef.current
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
    position: new THREE.Vector3(), 
    rotation: new THREE.Euler(),
    quaternion: new THREE.Quaternion(),
    matrix: new THREE.Matrix4(),
  }
  
  let axis = "";
  let tmp_q = new THREE.Quaternion();
  let vec3 = new THREE.Vector3();
  let mat = new THREE.Matrix4();
  let qWorld = new THREE.Quaternion();
  let qRefInvert = new THREE.Quaternion();
  let qRef = new THREE.Quaternion();
  let q = new THREE.Quaternion();
  let e = new THREE.Euler();
  // let 
  useFrame((state,delta,xrFrame) => {
    console.log(qRefInvert.x)
    if (refCoordRef.current === null || refCoordRef.current === undefined){
      refCoordRef.current = getCoordObj3d(refCoordStrRef.current);
      console.log(refCoordRef.current);
    }
    if (rightController){
      if(controlHelper.parent !== rightController.controller){
          rightController.controller.add(controlHelper);
        }
      if (!squeezePressed_R.current.now){   // squeeze released (it can be replaced by the case when trigger value true -> false)

        isOffsetUpdated.current = false;

      } else if ( controllerModeRef.current === "operating" ) {  //squeeze pressed
        // ref.current.matrixAutoUpdate = true;
        refCoordRef.current.getWorldQuaternion(qRef)
        qRefInvert.copy(qRef.clone().invert());

        //convert coordinate of position
        controller.position.copy(
          // ref.current.parent.worldToLocal(
          refCoordRef.current.worldToLocal(
            // rightController.controller.position));
            controlHelper.getWorldPosition(controller.position)));

        // get quaternion
        // rightController.controller.getWorldQuaternion(q)
        // q.copy(controlHelper.quaternion)
        controlHelper.getWorldQuaternion(controller.quaternion)
        // refCoordRef.current.getWorldQuaternion(qRefInvert)
        // qRefInvert.invert();
        controller.quaternion.premultiply(qRefInvert)

        controller.matrix.copy(controlHelper.matrixWorld);
        // mat.copy(refCoordRef.current.matrixWorld);
        // controller.matrix.premultiply(mat.invert());
        // vrLog(tmp_q.copy(q).invert().multiply(ref.current.quaternion).x)

        // calculate offset only in the first frame of squeezing session
        if (isOffsetUpdated.current === false){
          // vrLog(refCoordRef.current.name)
          // vrLog(qRefInvert.x.toString())
          // position offset
          // offsetRef.current.position.subVectors(ref.current.position, controller.position);
          ref.current.getWorldPosition(vec3)
          offsetRef.current.position.subVectors(refCoordRef.current.worldToLocal(vec3), controller.position);
          
          // quaternion offset
          ref.current.getWorldQuaternion(offsetRef.current.quaternion);
          // refCoordRef.current.getWorldQuaternion(offsetRef.current.quaternion)
          // refCoordRef.current.getWorldQuaternion(tmp_q)
          offsetRef.current.quaternion.premultiply(qRefInvert)
          offsetRef.current.quaternion.premultiply(controller.quaternion.clone().invert())
          // ref.current.getWorldQuaternion(offsetRef.current.quaternion);
          // offsetRef.current.quaternion.premultiply(q.clone().invert());

          //matrix approach
          offsetRef.current.matrix.copy(ref.current.matrixWorld)
          offsetRef.current.matrix.premultiply(controller.matrix.clone().invert())
          // vrLog(q.x.toString())
          // vrLog(offsetRef.current.quaternion.x.toString()+offsetRef.current.quaternion.y.toString()+offsetRef.current.quaternion.z.toString(),)
          isOffsetUpdated.current = true;
        }

        controller.quaternion.multiply(offsetRef.current.quaternion);
        // refCoordRef.current.getWorldQuaternion(tmp_q)
        // controller.quaternion.premultiply(tmp_q.invert())
        controller.rotation.setFromQuaternion(controller.quaternion);
        controller.rotation.reorder(rotatingOrder.current);

        controller.matrix.multiply(offsetRef.current.matrix);

        // controller.rotation.setFromRotationMatrix(controller.matrix);
        // controller.rotation.reorder(rotatingOrder.current);

        mat.copy(refCoordRef.current.matrixWorld);
        controller.matrix.premultiply(mat.invert());
        
        // update ref position and rotation
        // ref.current.position = controller.position + offset.current.position
        ref.current.position.copy(refCoordRef.current.worldToLocal(ref.current.getWorldPosition(ref.current.position)))
        
        if (useMatrixRef.current) vec3.setFromMatrixPosition(controller.matrix)
        else vec3.addVectors(controller.position, offsetRef.current.position) 
        
        translatingAxesRef.current.forEach((val,i) => {
          axis = String.fromCharCode(i+120);  //ascii of x,y,z are 120, 121, 122
      
          if ( val === true ) {     
            ref.current.position[axis] = vec3[axis];
            // ref.current.position[axis] = controller.position[axis] + offsetRef.current.position[axis]
          }
        })
        ref.current.position.copy(
          ref.current.parent.worldToLocal(
            refCoordRef.current.localToWorld(ref.current.position)));



        ref.current.getWorldQuaternion(qWorld)
        qWorld.premultiply(qRefInvert);
        ref.current.rotation.setFromQuaternion(qWorld, rotatingOrder.current);

        if(needAlignAngle.current){
          let isGimbalLock = false;

          // align 되었을때 ref의 축이 회전순서 마지막 축일 경우 이상행동
          alignAngle.current = [0,0,0];
          console.log(alignIndex.current.now)
          console.log(rotatingOrder.current)
          // ref.current.rotation.reorder(rotatingOrder.current)
          for (let i=0;i<1+alignIndex.current.now;i++){ //alignIndex: align된 축 갯수

            // if (refCoordStrRef.current === "TCP"){
              // axis = rotatingOrder.current.toLowerCase().slice(i,i+1)
            // } else if (refCoordStrRef.current === "robot"){
              // rotatingOrder: free(align) fix fix  순서
              // alignedIndex: align된 축 갯수 현재 세팅으로는 0 or 1 일때 위주로 활용 2가되면 사실상 all fixed
              // axis: 
              //  index 0 -> 2nd (free, free, fix) 
              //  index 1 -> 1st, 2nd (free, fix, fix) -> 문제가 있는 상황 
              //  index 2 -> 0th, 1st, 2nd (fix, fix, fix)
              //  현재 문제가 되는 상황은 index === 1 인 상황에서 두번째 회전각(첫번째 고정각)이 90도, 270도 등일때
              //      (align 결과 마지막 회전축이 첫번째 회전축과 겹칠때) -> aka 짐벌락
              //  계산결과 짐벌락이 일어나는 환경으로 판단되면 회전순서중 1st, 2nd 교체 후 재 계산 
              axis = rotatingOrder.current.toLowerCase().slice(2-alignIndex.current.now+i,2-alignIndex.current.now+i+1)
            // }

            alignAngle.current[i] = (ref.current.rotation[axis] + 2.0*Math.PI) % alignUnitAngle.current;
            
            if( alignAngle.current[i] > 0.5*alignUnitAngle.current ) alignAngle.current[i] -= alignUnitAngle.current;

            ref.current.rotation[axis] -= alignAngle.current[i];
            // vrLog(axis)
            // vrLog(ref.current.rotation[axis])
            vrLog("alignIndex")
            vrLog(alignIndex.current.now)

            if(alignIndex.current.now === 1 && i === 0){
              vrLog("1111")
              let angle = Math.abs(ref.current.rotation[axis] - Math.PI)
              if (Math.abs(angle - 0.5 * Math.PI) < 1e-7) {
                isGimbalLock = true
                vrLog("gimbalLock!!")
              }
            }
          }

          // 짐벌락인 경우 재계산
          if( isGimbalLock){
            // rotatingOrder 수정
            let charArr = rotatingOrder.current.split("");
            charArr = [charArr[0], charArr[2], charArr[1]];
            rotatingOrder.current = charArr.join("");
            vrLog(rotatingOrder.current)

            // ref.current.rotation 재할당
            ref.current.rotation.setFromQuaternion(qWorld, rotatingOrder.current);

            // 재계산
            alignAngle.current = [0,0,0];
            for (let i=0;i<1+alignIndex.current.now;i++){ //alignIndex: align된 축 갯수
              axis = rotatingOrder.current.toLowerCase().slice(2-alignIndex.current.now+i,2-alignIndex.current.now+i+1)
  
              alignAngle.current[i] = (ref.current.rotation[axis] + 2.0*Math.PI) % alignUnitAngle.current;
              
              if( alignAngle.current[i] > 0.5*alignUnitAngle.current ) alignAngle.current[i] -= alignUnitAngle.current;
  
              ref.current.rotation[axis] -= alignAngle.current[i];
            }

            isGimbalLock = false;
          }

          // vrLog(JSON.stringify(alignAngle.current))ƒ
          
          needAlignAngle.current = false;
        }

        rotatingAxesRef.current.forEach((val,i) => {
          axis = String.fromCharCode(i+120);  //ascii of x,y,z are 120, 121, 122
          if ( val === true ) {     
            // e[axis] = controller.rotation[axis] 
            ref.current.rotation[axis] = controller.rotation[axis] 
            // console.log(ref.current.rotation[axis]*RAD2DEG)
          }
        })
        ref.current.quaternion.setFromEuler(ref.current.rotation);
        ref.current.quaternion.premultiply(qRef)
        ref.current.parent.getWorldQuaternion(tmp_q)
        ref.current.quaternion.premultiply(tmp_q.invert());
        // ref.current.rotation.setFromQuaternion(q,rotatingOrder.current)
        // ref.current.updateMatrix();
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
    <group ref={ref} {...props} >
      <Box args={[0.2,0.01,0.01]} position={[0.05, 0, 0]} material-color="red"/>
      <Box args={[0.01,0.2,0.01]} position={[0, 0.05, 0]} material-color="green"/>
      <Box args={[0.01,0.01,0.2]} position={[0, 0, 0.05]} material-color="blue"/>

      {/* <Box args={[0.2,0.01,0.01]} material-color="red"/>
      <Box args={[0.01,0.2,0.01]} material-color="green"/>
      <Box args={[0.01,0.01,0.2]} material-color="blue"/> */}
      <axesHelper ref={globalAxisRef} args={[0.5]}/>
    </group>
  );
});

export default ControlGuide