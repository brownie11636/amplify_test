import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { useEffect, useRef, useContext, Suspense } from 'react';
import Image from "next/image";
import { useFrame } from '@react-three/fiber';

import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import SpatialVideo from './SpatialVideo';
import sampleImg from "./sample_jpeg.jpeg";
import { RgbdContext } from './XR.container';
import { GamepadContext } from "./GamepadContext"

const RobotArm = dynamic(() => import('./Robot_arm'), { ssr: false })
// const PortalArm = dynamic(() => import('./PortalArm'), { ssr: false })
import PortalArm from './PortalArm'

export default function RemoteGroup({XRscale, ...props}) {

  const ref = useRef();
  const gamepadRef = useContext(GamepadContext)

  useEffect(() => {
    console.log('in scene >> remotegroup');
  }, []);

  useFrame((state, delta, XRFrame) => {
    if(XRFrame){
      // let right = gamepadRef.current.right;
      if (true){

      }
    }
  })
  
  return (
    <group ref={ref} scale={1} >
      {/* <RobotArm  /> */}
      <Suspense >
        <PortalArm />
      </Suspense>
      <SpatialVideo scale={1} rotation={[0,-70*THREE.MathUtils.DEG2RAD,0]} position={[-0.7,0.93,-0.43]}/>
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />     */}
    </group>
  )
}
