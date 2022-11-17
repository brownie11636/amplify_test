import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import styles from "./Scene.module.css"
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';

// const Model = lazy(() => import('./Model'));
// const Model = dynamic(() => import('./Model'), { ssr: false })

//TODO: Model을 재귀함수로 불러와서 depth별로 추가해주는 방식으로 변경하면 좋을듯

export default function RobotArm() {
  // Everything defined in here will persist between route changes, only children are swapped
  const armLength = [0.12525, 0.16, 0.0368, 0.1117, 0.06478, 0.119] //base, and arm 0~5 (meter)
  
  const geometry = [
    [0, armLength[0], 0],
    [0, armLength[1], 0],
    [armLength[2], 0, 0],
    [armLength[3], 0, 0],
    [0, - (armLength[4]+0.04), 0],
  ];

  const armInfo = [{
    STLUrl: '/stls/base_binary.stl', 
    pos:[0,0,0],
    rot:[0, -90 * THREE.MathUtils.DEG2RAD, 0],
    attach: 'base',
  }];
  for (let i=0; i<7; i++){
    if (i === 0){
      // armInfo[i] = {
      //   STLUrl: '/stls/base_binary.stl', 
      //   pos:[0,0,0],
      //   rot:[0, -90 * THREE.MathUtils.DEG2RAD, 0],
      // }
    } else {
      armInfo.push({
        STLUrl: `/stls/arm${i-1}_binary.stl`,
        rot: [0, 0, 0],
        pos: [0, 0, 0],
        attach: `${armInfo[i-1].attach}-${i-1}`,
      })
      // console.log(armInfo[i].attach);
      if ( i > 1 ) {
        armInfo[i].pos = [0, armLength[i-2], 0];
      }
    }
    console.log(armInfo[i]);
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
      <Model info={armInfo[0]}>
        <Model info={armInfo[1]}>
          <Model info={armInfo[2]}>
            <Model info={armInfo[3]}>
              <Model info={armInfo[4]}>
                <Model info={armInfo[5]}>
                  <Model info={armInfo[6]} />
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
const Model = ({info, children, ...props}) => {
  const geom = useLoader(STLLoader, info.STLUrl);
  const ref = useRef();
  // const {camera} = useThree();

  // useEffect(() => {
  //     camera.lookAt(ref.current.position);
  // });

  return (
      <mesh ref={ref} position={info.pos} rotation={info.rot} >
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