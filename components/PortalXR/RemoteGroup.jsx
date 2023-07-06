import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { useEffect, useRef, useContext } from 'react'
import Image from "next/Image"

import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import SpatialVideo from './SpatialVideo';
import sampleImg from "./sample_jpeg.jpeg"
import { RgbdContext } from './XR.container';
// import styles from "./Scene.module.css"
// import 'bootstrap/dist/css/bootstrap.css';

const RobotArm = dynamic(() => import('./Robot_arm'), { ssr: false })
const PortalArm = dynamic(() => import('./PortalArm'), { ssr: false })
// const Box = dynamic(() => import('./boxes'), { sssr: false })

export default function RemoteGroup(props) {


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
      <SpatialVideo />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />     */}
    </group>
  )
}
