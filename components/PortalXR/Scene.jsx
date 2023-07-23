import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useEffect, useState, useMemo, useRef } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stats,Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands, useController } from '@react-three/xr'
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
// import styles from "./Scene.module.css"
import { Leva, useControls } from 'leva'
// import 'bootstrap/dist/css/bootstrap.css';

import DevBoard from "./DevBoard"
import RemoteGroup from "./RemoteGroup"
import { GamepadProvider } from "./GamepadContext"
import { GamepadInput } from "./GamepadInput"

// const Blob = dynamic(() => import('./Blob'), { ssr: false })

export default function Scene(portalRTC, ...props) {

  useEffect(() => {
    // console.log('in scene >>', props.PCD);
    //setVid(document.getElementById('remotevideo'));
  }, []);
  useEffect(()=>{
    console.log("Scence is rendered")
  })

  return (
    <>
      <VRButton />
      <div className="h-[500px]">
        <Canvas>
          <XR>
            <Stats showPanel={0} className="stats" {...props} />            
            <directionalLight intensity={0.75} />
            <ambientLight intensity={0.75} />
            {/* <Suspense fallback={null}> */}
              <Environment />
            {/* </Suspense> */}

            <Controllers />
            <Hands />
            <GamepadInput />


            {/* <Blob route='/' position-y={-0.75} /> */}
            {/* <Suspense fallback={null}> */}
            {/* </Suspense> */}
            {/* <Preload all /> */}
            <OrbitControls />
            {/* <VideoText position={[0, 1.3, -2]} />      */}
            {/* <Suspense fallback={null}> */}
            <GamepadProvider>
              {/* <DevBoard /> */}
              <RemoteGroup />

            </GamepadProvider>
            {/* </Suspense> */}
          </XR>
        </Canvas>
        {/* <Leva /> */}
      </div>
      {/* <button onClick={receiveData}>check recevice point-data</button> */}
    </>
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

