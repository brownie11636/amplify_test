import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useEffect, useState, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
// import styles from "./Scene.module.css"
import { Leva, useControls } from 'leva'
// import 'bootstrap/dist/css/bootstrap.css';

const RobotArm = dynamic(() => import('./Robot_arm'), { ssr: false })
const PortalArm = dynamic(() => import('./PortalArm'), { ssr: false })
// const Box = dynamic(() => import('./boxes'), { sssr: false })

export default function RemoteGroup(props) {

  // Everything defined in here will persist between route changes, only children are swapped

  useEffect(() => {

    console.log('in scene >> remotegroup');
    // console.log('in scene >>', props.PCD);
    //setVid(document.getElementById('remotevideo'));
  }, []);


  return (
    <group>
      {/* <RobotArm  /> */}
      {/* <Suspense > */}
      <PortalArm />
      {/* </Suspense> */}

      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />     */}
    </group>
  )
}
