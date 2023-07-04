import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { useEffect } from 'react'

import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
// import styles from "./Scene.module.css"
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
      {/* <SpatialVideo/> */}
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />     */}
    </group>
  )
}
