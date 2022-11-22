import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect} from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController, useXR } from '@react-three/xr'
import styles from "./Scene.module.css"
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import { Leva, useControls } from 'leva'
import * as myGamepadInput from '../../libs/XR/myGamepadInput'
import { Kinematics } from '../../libs/kinematics'

// const Model = lazy(() => import('./Model'));
// const Model = dynamic(() => import('./Model'), { ssr: false })

//TODO: Model을 재귀함수로 불러와서 depth별로 추가해주는 방식으로 변경하면 좋을듯
    // Model을 forwardRef로? 
    //calculateAngles 검토 및 적용
    //VR button이 오큘러스 쓰고 하면 VR unsupported가 뜸
    //code sandbox 예제는 안그러니까 탐색해보자

const RAD2DEG = THREE.MathUtils.RAD2DEG;
const DEG2RAD = THREE.MathUtils.DEG2RAD;

export default function RobotArm({armRot, ...props}) {
  // Everything defined in here will persist between route changes, only children are swapped

  const {
    // An array of connected `XRController`
    controllers,
    // Whether the XR device is presenting in an XR session
    isPresenting,
    // Whether hand tracking inputs are active
    isHandTracking,
    // A THREE.Group representing the XR viewer or player
    player,
    // The active `XRSession`
    session,
    // `XRSession` foveation. This can be configured as `foveation` on <XR>. Default is `0`
    foveation,
    // `XRSession` reference-space type. This can be configured as `referenceSpace` on <XR>. Default is `local-floor`
    referenceSpace
  } = useXR();

  const armLength = [0.12525, 0.16, 0.0368, 0.1117, 0.06478, 0.119] //base, and arm 0~5 (meter)

  //robotArm geometry
  const XRRatio = 0.4;   // real scale / virtual scale 
  const robotPos = [0.1, 0.1, 0.05];
  // let VRRobotPos = robotPos.map(el => el/XRRatio);
  const VRRobotPos = new THREE.Vector3(robotPos[0], robotPos[1], robotPos[2]);
  VRRobotPos.multiplyScalar( 1/XRRatio );
  
  const geometry = [
    [0, armLength[0], 0],
    [0, armLength[1], 0],
    [armLength[2], 0, 0],
    [armLength[3], 0, 0],
    [0, - (armLength[4]+0.04), 0],
  ];

  const RobotKin = new Kinematics(geometry)

  const rightController = useController('right');
  const initialAngles = [0,0,-90*DEG2RAD,0,-90*DEG2RAD,0];

  const myRobot1 = useRef(null);  
  const initialGamepadInput = myGamepadInput.create();
  const [angleTest, setAngleTest] = useState(0);
  const [angleTest2, setAngleTest2] = useState(0);
  const [gamepadInput, setGamepadInput] = useState(initialGamepadInput);
  const [angles,setAngles] = useState(initialAngles);


  useFrame((_, delta) => {      //

    if (!rightController) {
      // setAngleTest(angleTest + 0.5 * delta);
      return
    }
    

    // setAngleTest(rightController.grip.position.x);
    setGamepadInput(myGamepadInput.get(session, gamepadInput));
    // console.log(gamepadInput.right.new.buttons[0]);
    setAngles(
      calculateRobotAngles(rightController, XRRatio, VRRobotPos, RobotKin)
      .map((angle,i)=> angle+initialAngles[i])
    );
    // setAngleTest2(gamepadInput.right.new.buttons[0]);
    // myRobot1.current.rotation = [angleTest2, 0, 0];
    // setAngles([

    // ])
    


    // console.log(rightController.grip);
  })

  const armInfos = [];
  for (let i=0; i<7; i++){
    if (i === 0){
      armInfos[i] = {
        STLUrl: '/stls/base_binary.stl', 
        pos:[0,0,0],
      }
    } else {
      armInfos.push({
        STLUrl: `/stls/arm${i-1}_binary.stl`,
        pos: [0, 0, 0],
        // attach: `${armInfo[i-1].attach}-${i-1}`,
      })
      // console.log(armInfo[i].attach);
      if ( i > 1 ) {
        armInfos[i].pos = [0, armLength[i-2], 0];
      }
    }
    // console.log(armInfos[i]);
  }

  const STLUrl = ['/stls/base_binary.stl'];
  for (let i = 0; i < armLength.length;  i++ ) {
    STLUrl.push(`/stls/arm${i}_binary.stl`);
  }

  return (
    <group>
      {/* <Model url={STLUrl[1]}  />  */}
      {/* {STLUrl.map((url, index) => (
        <Model key={index} url={url}  />
      ))} */}
      {/* {armInfo.map((info, index) => (
          <Model 
            key={index}
            info={info}
            />
      ))} */}
      {/* <Model info={armInfos[0]} rotation={[armRot[0].rotX,armRot[0].rotY,armRot[0].rotZ]}>
        <Model info={armInfos[1]} rotation={[armRot[1].rotX,armRot[1].rotY,armRot[1].rotZ]}>
          <Model info={armInfos[2]} rotation={[armRot[2].rotX,armRot[2].rotY,armRot[2].rotZ]}>
            <Model info={armInfos[3]} rotation={[armRot[3].rotX,armRot[3].rotY,armRot[3].rotZ]}>
              <Model info={armInfos[4]} rotation={[armRot[4].rotX,armRot[4].rotY,armRot[4].rotZ]}>
                <Model info={armInfos[5]} rotation={[armRot[5].rotX,armRot[5].rotY,armRot[5].rotZ]}>
                  <Model info={armInfos[6]} rotation={[armRot[6].rotX,armRot[6].rotY,armRot[6].rotZ]}/> */}
      <Model info={armInfos[0]} rotation={[0, -90*THREE.MathUtils.DEG2RAD,0]}>
        <Model info={armInfos[1]} rotation={[0,angles[0],0]}>
          <Model info={armInfos[2]} rotation={[angles[1],0,0]}>
            <Model info={armInfos[3]} rotation={[angles[2],0,0]}>
              <Model info={armInfos[4]} rotation={[0,angles[3],0]}>
                <Model info={armInfos[5]} rotation={[angles[4],0,0]}>
                  <Model info={armInfos[6]} rotation={[0,angles[5],0]}/>
                </Model>
              </Model>
            </Model>
          </Model>
        </Model>
      </Model>
    </group>
  )
}

// const Model = (props) => {
const Model = ({info, children, rotation, ...props}) => {
  const geom = useLoader(STLLoader, info.STLUrl);
  const ref = useRef();
  // const {camera} = useThree();

  // useEffect(() => {
  //     camera.lookAt(ref.current.position);
  // });

  return (
    <mesh ref={ref} position={info.pos} rotation={rotation}>
      <primitive object={geom} attach="geometry"/>
      <meshPhongMaterial 
        color='0xb0bef0'
        specular='0x111111' 
        shininess='200' 
        transparent 
        opacity='0.9' 
      />
      {children}
    </mesh>
  );
};


function calculateRobotAngles(target,XRRatio,VRRobotPos,RobotKin){
  // let Q = target.quaternion;
  let Tp = new THREE.Vector3();
  target.getWorldPosition(Tp)
  Tp.sub(VRRobotPos); // calibration
  Tp.multiplyScalar(XRRatio);   //calibration
  // testArm.position.set(-Tp.z,Tp.y,Tp.x);    //rotate on Y axis

  // let Tq= new THREE.Quaternion();   
  // target.getWorldQuaternion(Tq);    
  // testArm.rotation.setFromQuaternion(Tq);   
  // testArm.rotateOnWorldAxis(new THREE.Vector3(0,1,0),-Math.PI/2);   //rotate on Y axis
  
  // let Q = new THREE.Quaternion();
  // let E = new THREE.Euler();
  // let E2 = new THREE.Euler(0, -Math.PI/2, 0, 'XYZ');    
  // testArm.getWorldQuaternion(Q);
  // let P = new THREE.Vector3();
  // testArm.getWorldPosition(P);
  // let Qi = new THREE.Quaternion();
  // Qi.setFromEuler(E2);
  // Qi.invert();
  // Q.multiply(Qi);
  // E.setFromQuaternion(Q);
  let Te= target.rotation;

  let calbirated6Dof = [
    Tp.x,
    Tp.y,
    Tp.z,
    Te.x,
    Te.y,
    Te.z
  ];
  
  let angles = RobotKin.inverse(...calbirated6Dof);

  // targetProfile.position.set(10*Tp.x,10*Tp.y,10*Tp.z);
  // targetProfile.setRotationFromQu aternion(Tq)
  console.log(angles);
  // robotArmJ4.position.set( RobotKin.J_now[4][2] * 10, RobotKin.J_now[4][1] *10, - RobotKin.J_now[4][0] *10);

  return angles;

}