import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import styles from "./Scene.module.css"

const Blob = dynamic(() => import('./Blob'), { ssr: false })
const RobotArm = dynamic(() => import('./RobotArm'), { ssr: false })

export default function Scene() {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <div className={styles.canvasContainer}>
      <VRButton />
      <Canvas>
        <directionalLight intensity={0.75} />
        <ambientLight intensity={0.75} />
        <Suspense fallback={null}>
          <Environment />
        </Suspense>

        <XR>
          <Controllers />
          <Hands />

          {/* <Blob route='/' position-y={-0.75} /> */}
          <RobotArm />

          <Preload all />
          <OrbitControls />
        </XR>
      </Canvas>
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

