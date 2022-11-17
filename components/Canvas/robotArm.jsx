import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Preload, Html } from '@react-three/drei'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import styles from "./Scene.module.css"
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';


export default function RobotArm() {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <group>
      <Model url={`/stls/base_binary.stl`}  /> 
    </group>
  )
}

const Model = ({url}) => {
  const geom = useLoader(STLLoader, url);

  const ref = useRef();
  const {camera} = useThree();
  useEffect(() => {
      camera.lookAt(ref.current.position);
  });

  return (
    <mesh ref={ref}>
      <primitive object={geom} attach="geometry"/>
      <meshPhongMaterial 
        color='0xb0bef0' 
        specular='0x111111' 
        shininess='200' 
        transparent 
        opacity='0.9' 
      />
    </mesh>
  );
};