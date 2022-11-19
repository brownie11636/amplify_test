import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useRef, useState, useMemo, useEffect} from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import styles from "./Scene.module.css"
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import { Leva, useControls } from 'leva'


// const Model = lazy(() => import('./Model'));
// const Model = dynamic(() => import('./Model'), { ssr: false })

//TODO: Model을 재귀함수로 불러와서 depth별로 추가해주는 방식으로 변경하면 좋을듯

export default function RobotArm({armRot, ...props}) {
  // Everything defined in here will persist between route changes, only children are swapped
  const armLength = [0.12525, 0.16, 0.0368, 0.1117, 0.06478, 0.119] //base, and arm 0~5 (meter)
  
  const geometry = [
    [0, armLength[0], 0],
    [0, armLength[1], 0],
    [armLength[2], 0, 0],
    [armLength[3], 0, 0],
    [0, - (armLength[4]+0.04), 0],
  ];

  const myRobot1 = useRef();

  let [angleTest, setAngleTest] = useState(0);

  const rightController = useController('right');

  useFrame((_, delta) => {      //

    if (!rightController) {
      setAngleTest(angleTest + 0.3 * delta);
      return
    }
    setAngleTest(rightController.grip.position.x);

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
      <Model info={armInfos[0]} rot={[armRot[0].rotX,armRot[0].rotY,armRot[0].rotZ]}>
        <Model ref={myRobot1} info={armInfos[1]} rot={[0, angleTest, 0]}>
        {/* <Model ref={myRobot1} info={armInfos[1]} rot={[armRot[1].rotX,armRot[1].rotY,armRot[1].rotZ]}> */}
          <Model info={armInfos[2]} rot={[armRot[2].rotX,armRot[2].rotY,armRot[2].rotZ]}>
            <Model info={armInfos[3]} rot={[armRot[3].rotX,armRot[3].rotY,armRot[3].rotZ]}>
              <Model info={armInfos[4]} rot={[armRot[4].rotX,armRot[4].rotY,armRot[4].rotZ]}>
                <Model info={armInfos[5]} rot={[armRot[5].rotX,armRot[5].rotY,armRot[5].rotZ]}>
                  <Model info={armInfos[6]} rot={[armRot[6].rotX,armRot[6].rotY,armRot[6].rotZ]} />
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
const Model = ({info, rot, children, ...props}) => {
  const geom = useLoader(STLLoader, info.STLUrl);
  const ref = useRef();
  // const {camera} = useThree();

  // useEffect(() => {
  //     camera.lookAt(ref.current.position);
  // });

  return (
    <mesh ref={ref} position={info.pos} rotation={rot} >
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