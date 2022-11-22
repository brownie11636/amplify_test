import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useEffect, useState, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import styles from "./Scene.module.css"
import { Leva, useControls } from 'leva'


const Blob = dynamic(() => import('./Blob'), { ssr: false })
const RobotArm = dynamic(() => import('./RobotArm'), { ssr: false })

export default function Scene() {
  // Everything defined in here will persist between route changes, only children are swapped

  const options = useMemo(() => {
    return {
      rotX:{ value: 0, min: -3.14, max: 3.14, step: 0.1 },
      rotY:{ value: 0, min: -3.14, max: 3.14, step: 0.1 },
      rotZ:{ value: 0, min: -3.14, max: 3.14, step: 0.1 },
    }
  })

  const armRot = [];
  for (let i=0; i<7; i++){
    if (i === 0) armRot[i] = useControls('base', options);
    else armRot[i] = useControls(`Arm ${i-1}`,options);
  }

  const [isAR, setIsAR] = useState(' ');
  const [isVR, setIsVR] = useState(' ');
  const [isWeb, setIsWeb] = useState(' ');

  useEffect( () => {
    checkXR();
    console.log(isAR);
    console.log(isVR);
    console.log(isWeb);
  },[])

  async function checkXR() {
    // if(navigator.xr == undefined) setIsWeb('just web');
    // let isAR = await navigator.xr.isSessionSupported( 'immersive-ar');
    // if(isAR) setIsAR('webAR');
    // let isVR = await navigator.xr.isSessionSupported( 'immersive-vr');
    // if(isVR) setIsVR('webVR');
    console.log(navigator.xr);
    console.log(navigator);
  }


  return (
      <div className={styles.canvasContainer}>
        <VRButton />
        <Canvas>
          <XR>
            <directionalLight intensity={0.75} />
            <ambientLight intensity={0.75} />
            <Suspense fallback={null}>
              <Environment />
            </Suspense>

            <Controllers />
            <Hands />

            {/* <Blob route='/' position-y={-0.75} /> */}
            <RobotArm attach='robot' armRot={armRot} />

            <Preload all />
            <OrbitControls />
          </XR>
        </Canvas>
        <Leva />
      </div>
  )
}

// https://github.com/pmndrs/react-three-fiber/discussions/1240
function Environment() {
  const { scene } = useThree()
  // const texture = useLoader(THREE.CubeTextureLoader,[
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  //   'https://threejs.org/manual/examples/resources/images/grid-1024.png'
  // ])
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
    'https://threejs.org/manual/examples/resources/images/grid-1024.png',
  ]);
  // texture.mapping = THREE.EquirectangularReflectionMapping
  texture.encoding = THREE.sRGBEncoding

  scene.background = texture
  return null
}

