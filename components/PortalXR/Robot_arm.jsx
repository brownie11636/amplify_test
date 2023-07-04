import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect} from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController, useXR } from '@react-three/xr'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import * as myGamepadInput from '../../libs/XR/myGamepadInput'
import { Kinematics } from '../../libs/kinematics_YS'

// const Model = lazy(() => import('./Model'));
// const Model = dynamic(() => import('./Model'), { ssr: false })

//TODO: Model을 재귀함수로 불러와서 depth별로 추가해주는 방식으로 변경하면 좋을듯
    // Model을 forwardRef로? 
    // sendmessage 적용 ()

const RAD2DEG = THREE.MathUtils.RAD2DEG;
const DEG2RAD = THREE.MathUtils.DEG2RAD;

export default function RobotArm({type, path, ...props}) {
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
  const robotPos = [0.1, 0.3, 0.05];
  // let VRRobotPos = robotPos.map(el => el/XRRatio);
  const VRRobotPos = new THREE.Vector3(robotPos[0], robotPos[1], robotPos[2]); // 로봇 최초 포지션 설정
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
  const initialAngles = [0,0,-90*DEG2RAD,0,0,0];
  // const initialAngles = [0,0,-90*DEG2RAD,0,-90*DEG2RAD,0];

  const robotArm = useRef(null);  
  // robotBase.current.scale.setScalar( 1/XRRatio );

  const initialGamepadInput = myGamepadInput.create();
  const [angleTest, setAngleTest] = useState(0);
  const [angleTest2, setAngleTest2] = useState(0);
  const [gamepadInput, setGamepadInput] = useState(initialGamepadInput);
  const [angles,setAngles] = useState(initialAngles);
  const [recordOn, setRecordOn] = useState(false);
  const [endEffectControl, setEndEffectControl] = useState(0);
  const [prevControllerPos, setPrevControllerPos] = useState(null);
  const [velocity, setVelocity] = useState(null);


  useFrame((_, delta) => {      //

    if (!rightController) {
      // setAngleTest(angleTest + 0.5 * delta);
      return
    }
    // setAngleTest(rightController.grip.position.x);
    setGamepadInput(myGamepadInput.get(session, gamepadInput));


    console.log(gamepadInput.right.new.buttons[0]);
    if (gamepadInput.right.new.buttons[0] > 0.7){     //squeeze button: 0 ~ 1      trigger in webXR emulator
      //set Transparency
      if(gamepadInput.right.prev.buttons[1] < 0.7){
        robotArm.current.traverse((obj)=>{
          if (obj.isMesh) obj.material.opacity = 0.6;
        });
      }

      //control of endEffect
      if (gamepadInput.right.new.buttons[0] > 0.5){
        if (endEffectControl < 0.53 ) setEndEffectControl(endEffectControl + 0.01);
      } else if (endEffectControl >= 0.02 ) setEndEffectControl(endEffectControl - 0.01);

      //operating virtual arm
      setAngles(
        calculateRobotAngles(rightController.controller, XRRatio, VRRobotPos, RobotKin)
        .map((angle,i)=> angle + initialAngles[i])
      );

      sendMessage2(JSON.stringify(msg_v2));

      //get velocity
      let P = new THREE.Vector3
      if(prevControllerPos){
        let dist = rightController.controller.getWorldPosition(P).sub(prevControllerPos).length();
        // setVelocity(dist/delta);
        setVelocity(dist/delta);
        // console.log(velocity);
      }
      setPrevControllerPos(rightController.controller.getWorldPosition(P));
      // console.log(prevControllerPos);
    } else if(gamepadInput.right.prev.buttons[0] > 0.7){
      //get back opacity
      robotArm.current.traverse((obj)=>{
        if (obj.isMesh) obj.material.opacity = 0.85;
      });      
    }

    //record data
    //send message part is incompleted
    if ((gamepadInput.right.new.buttons[5] !== gamepadInput.right.prev.buttons[5])  //button B: 0 or 1
    && (gamepadInput.right.new.buttons[5] > 0.8)){
      console.log("button ON!")
      setRecordOn(!recordOn);
      let [recordCMD, color] = recordOn? ["START",'#ddaaaa']:["WRITE","#b0bef0"];

      // if (target_robot_profile !== undefined && target_robot_profile !== null) {
      //   sendMessage2(JSON.stringify({type:"CONFIG",data:{record: recordCMD}}));    
      // }
      robotArm.current.traverse((obj)=>{
        if (obj.isMesh) obj.material.color.set(color);
      });

    }
    
    // console.log(rightController.grip);
  })
  

  const [armInfos, setArmInfos] = useState(() =>{
    const infos = []
    for (let i=0; i<7; i++){
      if (i === 0){
        infos[i] = {
          STLUrl: '/stls/base_binary.STL', 
          pos:[0, 0, 0]
          // pos:[VRRobotPos.x, VRRobotPos.y, VRRobotPos.z],
        }
      } else {
        infos.push({
          STLUrl: `/stls/arm${i-1}_binary.STL`,
          pos: [0, 0, 0],
          // attach: `${armInfo[i-1].attach}-${i-1}`,
        })
        // console.log(armInfo[i].attach);
        if ( i > 1 ) {
          infos[i].pos = [0, armLength[i-2], 0];
        }
      }
    }
    return infos
  });


  return (
    <group position={VRRobotPos} scale ={ 1/XRRatio } ref={robotArm}>
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
      <Model info={armInfos[0]} rotation={[0, -90*THREE.MathUtils.DEG2RAD,0]} >
        <Model info={armInfos[1]} rotation={[0, angles[0], 0]}>
          <Model info={armInfos[2]} rotation={[angles[1], 0, 0]}>
            <Model info={armInfos[3]} rotation={[angles[2], 0, 0]}>
              <Model info={armInfos[4]} rotation={[0, angles[3], 0]}>
                <Model info={armInfos[5]} rotation={[angles[4], 0, 0]}>
                  <Model info={armInfos[6]} rotation={[0, angles[5], 0]}/>
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
    <group position={info.pos} rotation={rotation}>

      <mesh ref={ref} >
        <primitive object={geom} attach="geometry"/>
        <meshPhongMaterial 
          color='#b0bef0'   //0xb0bef0로 쓰면 안됨
          specular='#111111' 
          shininess='200' 
          transparent 
          opacity='0.85' 
          />
      </mesh>
      {children}
    </group>
  );
};


function calculateRobotAngles(target, XRRatio, VRRobotPos, RobotKin){
  // let Q = target.quaternion;
  let P = new THREE.Vector3();
  let E= target.rotation;
  target.getWorldPosition(P)
  P.sub(VRRobotPos); // calibration
  P.multiplyScalar(XRRatio);   //calibration

  // console.log( P );
  // console.log( E );

  let calbirated6Dof = [
    P.x,
    P.y,
    P.z,
    E.x,
    E.y,
    E.z
  ];
  
  let angles = RobotKin.inverse(...calbirated6Dof);

  // targetProfile.position.set(10*Tp.x,10*Tp.y,10*Tp.z);
  // targetProfile.setRotationFromQu aternion(Tq)

  // console.log(angles);
  // robotArmJ4.position.set( RobotKin.J_now[4][0], RobotKin.J_now[4][1], RobotKin.J_now[4][2]);

  return angles;

}