import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import styles from "./Scene.module.css"

const Blob = dynamic(() => import('./Blob'), { ssr: false })

export default function Scene() {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <div className={styles.canvasContainer}>
      <Canvas>
        <directionalLight intensity={0.75} />
        <ambientLight intensity={0.75} />

        <Blob route='/' position-y={-0.75} />

        <Preload all />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
