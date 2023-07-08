import * as THREE from 'three'
import { Suspense, useEffect, useState, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stats,Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

import { PortalCommContext } from '../../utils/contexts/portalComm';
import * as myGamepadInput from '../../libs/XR/myGamepadInput'

const RAD2DEG = THREE.MathUtils.RAD2DEG;
const DEG2RAD = THREE.MathUtils.DEG2RAD;
// import styles from "./Scene.module.css"

export default Send6DoFControl = ({...props}) => {
  
  const { controllers } = useXR();

  const commClient = useContext(PortalCommContext);

  const rightController = useController('right');
  const leftController = useController('left');

  useFrame((state, delta, XRFrame) => {
    if(rightController){
      const{ grip: controller } = rightController
      const position = new THREE.Vector3().copy(controller.position)
      // commClient.socket.~~emmit``
    }
  })

  // const initialGamepadInput = myGamepadInput.create();
  // const [gamepadInput, setGamepadInput] = useState(initialGamepadInput);



}